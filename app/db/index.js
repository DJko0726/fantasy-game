const { Client } = require('pg');
const { v4: uuidv4 ,v6: uuidv6} = require('uuid');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Taipei');
class Basketball {

  constructor() {
    this.client = new Client({
      user: 'postgres',
      host: 'postgres-fantasyBK',//postgres-fantasyBK
      database: 'basketball',
      password: 'postgres',
      port: 5432,
    });
    this.client.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL');
    } catch (err) {
      console.error('Error connecting to PostgreSQL:', err.message);
    }
  }

  async select() {
    try {
      await this.client.connect();
      console.log('Connected to PostgreSQL');
      // 在這裡添加你的 SQL 查詢邏輯
    } catch (err) {
      console.error('Error executing SQL query:', err.message);
    }
  }

  async selectOneWithSeason(qWhere) {
    try {
      const query = 'SELECT * FROM player_data WHERE name = $1 AND season = $2';
      let result = await this.client.query(query, qWhere)
      return result.rows
    } catch (err) {
      console.error('Error executing SQL query:', err.message);
    }
  }

  async selectOne(qWhere) {
    try {
      const query = 'SELECT * FROM player_data WHERE name = $1 order by season desc';
      let result = await this.client.query(query, [qWhere.name])
      return result.rows
    } catch (err) {
      return ['Error executing SQL query:', err.message];
    }
  }

  async insert(item) {
    try {
      let uid = uuidv4()
      let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
      let playerData = [
        uid,
        item.Name,
        item.Season,
        item.Team,
        item.Position,
        item.Games,
        item.Started,
        item.Points,
        item.Rebounds,
        item.Assists,
        item.BlockedShots,
        item.Steals,
        item.Turnovers,
        item.FieldGoalsPercentage,
        item.FreeThrowsPercentage,
        item.ThreePointersMade,
        item.ThreePointersPercentage,
        item.DoubleDoubles,
        (item.FantasyPoints + item.FantasyPointsFanDuel + item.FantasyPointsDraftKings + item.FantasyPointsYahoo + item.FantasyPointsFantasyDraft) / 5,
        currentDate,
        currentDate 
      ]
      const query = `INSERT INTO player_data (
        uid,
        name,
        season,
        team,
        position,
        game_played,
        game_started,
        point,
        rebounds,
        assists,
        blocked,
        steals,
        turnovers,
        fg_percentage,
        ft_percentage,
        three_point,
        three_point_percentage,
        dd,
        average_fantasy_point,
        created_time,
        updated_time
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)`
      
      await this.client.query(query, playerData)
    } catch (err) {
      console.error('Error executing SQL query:', err.message)
    }
  }

  async update(item,qWhere) {
    try {
      let currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
      let playerData = [
        item.Team,
        item.Position,
        item.Games,
        item.Started,
        item.Points,
        item.Rebounds,
        item.Assists,
        item.BlockedShots,
        item.Steals,
        item.Turnovers,
        item.FieldGoalsPercentage,
        item.FreeThrowsPercentage,
        item.ThreePointersMade,
        item.ThreePointersPercentage,
        item.DoubleDoubles,
        (item.FantasyPoints + item.FantasyPointsFanDuel + item.FantasyPointsDraftKings + item.FantasyPointsYahoo + item.FantasyPointsFantasyDraft) / 5,
      ]
      const query = `UPDATE  player_data SET 
        team = $1,
        position = $2,
        game_played = $3,
        game_started = $4,
        point = $5,
        rebounds = $6,
        assists = $7,
        blocked = $8,
        steals = $9,
        turnovers = $10,
        fg_percentage = $11,
        ft_percentage = $12,
        three_point = $13,
        three_point_percentage = $14,
        dd = $15,
        average_fantasy_point = $16,
        updated_time = $17
        WHERE name = $18 and season = $19`
      
      await this.client.query(query,  [...playerData,...[currentDate],...qWhere])
    } catch (err) {
      console.error('Error executing SQL query:', err.message)
    }
  }
}

module.exports = Basketball;
