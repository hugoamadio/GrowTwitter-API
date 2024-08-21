import { Request, Response } from "express";
import db from "../database/prisma.connection";

class TweetController {
  public async create(req: Request, res: Response) {
    const { content, type, userId } = req.body;
    try {
      const tweetCreated = await db.tweet.create({
        data: {
          content,
          type,
          userId,
        },
      });
      if (tweetCreated) {
        return res.status(201).json({ success: true, msg: "Tweet created" });
      }
      return res.status(400).json({ success: false, msg: "Tweet not created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const tweet = await db.tweet.findMany();
      if (tweet) {
        return res.status(200).json({ success: true, data: tweet });
      }
      return res.status(404).json({ success: false, msg: "Users not found" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tweet = await db.tweet.findUnique({
        where: {
          id,
        },
      });
      if (tweet) {
        return res.status(200).json({ success: true, data: tweet });
      }
      return res.status(404).json({ success: false, msg: "Tweet not found" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const tweet = await db.tweet.findUnique({
        where: {
          id,
        },
      });
      if (!tweet) {
        return res.status(404).json({ success: false, msg: "Tweet not found" });
      }
      const tweetUpdate = await db.tweet.update({
        data: {
          content,
        },
        where: {
          id,
        },
      });
      if (tweetUpdate) {
        return res.status(200).json({ success: true, msg: "Tweet updated" });
      }
      return res.status(400).json({ success: false, msg: "Tweet not updated" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await db.tweet.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ success: true, msg: "Tweet deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }
}

export default TweetController;
