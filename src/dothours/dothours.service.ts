import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { ParametersService } from 'src/parameters/parameters.service';
import { DotHour } from '../core/models/dothour.entity';

@Injectable()
export class DotHoursService {

  constructor(@Inject('DOTHOURS_REPOSITORY') private dotHoursRepository: typeof DotHour,
    private readonly parameterService: ParametersService){}

  async listDotHoursByMonth(iduser: number, dateReference: Date) {

    if (!dateReference) {
      dateReference = (await this.parameterService.getByCod(1)).value;
    }

    const result = await this.dotHoursRepository.sequelize.query(`
      WITH RECURSIVE _dates(date, iduser) AS (
          VALUES
              ((first_day(($dateReference::date)) +
              (select p.value::int from epw.parameter as p where p.codparameter = 2)), $id::integer)
        UNION ALL
          SELECT
              date+1, iduser FROM _dates WHERE date < last_day(($dateReference::date))+(select p.value::int from epw.parameter as p where p.codparameter = 2)
      ),
      _hours AS (
          SELECT * FROM epw.dothour as dt
      ),
      dates_hours AS (
          SELECT
              d.iduser, d.date, h.hour
          FROM _dates d
          LEFT JOIN
              epw.dothour h ON h.date = d.date AND h.iduser = d.iduser
          ORDER BY d.date ASC
      )
      SELECT
          r.iduser, r.date, r.hour,
          (sum(r.total) over(partition by r.date))::int * interval '1 sec' as calcHours
      FROM (
          SELECT
              r.iduser, r.date, r.hour, r.dateprevious,
              CASE WHEN (r.lineprevious IS NULL OR r.lineprevious = 0) THEN 0 ELSE
                  EXTRACT(EPOCH FROM (r.hour - r.dateprevious))
              END AS total
          FROM (
              SELECT
                  r.*,
                  lag(r.line, 1) OVER(PARTITION BY r.iduser, r.date ORDER BY r.date, r.hour) AS lineprevious
              FROM (
                  SELECT
                      dh.*,
                      lag(dh.hour, 1) OVER(PARTITION BY dh.iduser, dh.date ORDER BY dh.date, dh.hour)::time AS dateprevious,
                      mod(row_number() over(partition by dh.iduser, dh.date order by dh.date, dh.hour asc), 2) as line
                  FROM dates_hours dh
              ) AS r
              order by r.iduser, r.date, r.hour
          ) AS r
      ) AS r
    `,{ bind: { id: iduser, dateReference }, type: QueryTypes.SELECT });

    const registers = {
      idUser: iduser,
      dates: [] // https://stackoverflow.com/questions/28994496/why-does-express-js-return-an-empty-array-when-using-res-send/48022515#48022515
    };

    let index = 0;
    result.forEach(element => {

      let exist = registers.dates.find(i => (i && i.date === element.date));
      if (!exist) {
        registers.dates[index] = { date: element.date, hours: [] };
        exist = registers.dates[index];
        index++;
      }

      if (exist && element.hour) {
        exist.hours.push(element.hour);
      }
    });

    return registers;
  }

  async getTimeBalance(iduser: number, dateReference: Date) {

      const result = await this.dotHoursRepository.sequelize.query(
      `
      WITH horarios AS (
          SELECT
              r.iduser, r.date, r.hour, linha
          FROM (
              SELECT
                  r.iduser, r.date, r.hour, r.linha,
                  CASE WHEN (MAX(r.completo) OVER(PARTITION BY r.iduser, r.date) = 1) THEN r.total - 1 ELSE r.total END AS total

              FROM (
                  SELECT
                      r.*,
                      CASE WHEN (r.linha = r.total AND mod(r.linha, 2) = 1) THEN 1 ELSE 0 END AS completo
                  FROM (
                      SELECT
                        dh.iduser,
                        dh.date,
                        dh.hour,
                        ROW_NUMBER() OVER(PARTITION BY dh.iduser, dh.date ORDER BY dh.hour) AS linha,
                        COUNT(1) OVER(PARTITION BY dh.iduser, dh.date)                      AS total
                      FROM
                        epw.dothour dh
                      WHERE 
                        dh.iduser = $iduser
                  ) AS r
              ) AS r
          ) AS r
          WHERE
              r.linha <= r.total
      )
      SELECT
        r.iduser,
        sum((r.realizado - '08:00:00'))::varchar AS saldo,
        SUM(r.realizado)::varchar AS totalRealizado
      FROM (
          SELECT
              r.iduser, r.date,
              SUM(CASE WHEN (r.realizado = 1) THEN (r.closeHour - r.hour) ELSE '00:00:00' END) AS realizado,
              SUM(CASE WHEN (r.realizado = 0) THEN (r.closeHour - r.hour) ELSE '00:00:00' END) AS intervalo
          FROM (
              SELECT
                  h.*,
                  lead(h.hour) OVER(PARTITION BY h.iduser, h.date) AS closeHour,
                  mod(h.linha, 2) as realizado
              FROM horarios h
          ) AS r
          GROUP BY r.iduser, r.date
      ) AS r
      GROUP BY r.iduser
      `,
      { bind: { iduser }, type: QueryTypes.SELECT });

      return result.pop();
  }

  async registerDotHour(iduser: number, dateHour: Date) {

    try {
      if (!dateHour) {
        throw new HttpException('Validation failed', HttpStatus.NOT_ACCEPTABLE);
      }
  
      console.log('dateHour', dateHour, typeof dateHour);
      dateHour = new Date(dateHour);
      dateHour.setSeconds(0,0);
  
      const total = await this.dotHoursRepository.sequelize.query(
        `SELECT count(1) FROM epw.dothour WHERE iduser = $iduser AND date = $dateHour::date AND hour = date_trunc('minutes', $dateHour)::time`,
        { bind: { iduser, dateHour }, type: QueryTypes.SELECT }
      );
  
      if (total > 0) {
        throw new BadRequestException('Date/Hour already exist');
      }

      console.log(dateHour.toLocaleTimeString(), dateHour.toLocaleDateString());
  
      await this.dotHoursRepository.create({
        iduser,
        date: dateHour.toLocaleDateString(),
        hour: dateHour.toLocaleTimeString(),
      } as DotHour);
    } catch (error) {
      throw new BadRequestException(error);
    }
    
  }

  async clearDay(iduser: number, date: Date) {
    await this.dotHoursRepository.sequelize.query(`
      DELETE FROM epw.dothour WHERE iduser = $iduser AND date = $date
    `,{ bind: { iduser, date }, type: QueryTypes.DELETE });
  }

}
