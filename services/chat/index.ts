import { Request, Response, NextFunction, Router } from "express";
import db from "../../DB/db";

const router = Router();

router.get(
  "/history",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data: any = await db.execute(`SELECT * FROM chat
    where sender IN ('${req.query.sender}','${req.query.reciver}') AND reciver IN ('${req.query.sender}','${req.query.reciver}');`);

      res.status(200).json(data[0]);
    } catch (e) {
      res.status(500).json({ message: "مشکلی پیش آمده است" });
    }
  }
);

router.get(
  "/my_rooms",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data: any = await db.execute(`SELECT t.reciver as id,
          CASE
              WHEN c.url IS NOT NULL THEN c.title
              ELSE u.first_name
              END AS first_name,
              CASE
              WHEN c.url IS NOT NULL THEN c.description
              ELSE u.last_name
              END AS last_name
              from (SELECT distinct reciver FROM test.chat
              where sender IN ('${req.query.user}')
              UNION
              SELECT distinct sender FROM test.chat
              where reciver IN ('${req.query.user}'))t
              LEFT JOIN user u
              ON t.reciver=u.id
              LEFT JOIN company c
              ON t.reciver=c.url
              ;`);

      res.status(200).json(data[0]);
    } catch (e) {
      res.status(500).json({ message: "مشکلی پیش آمده است" });
    }
  }
);

export default router;
