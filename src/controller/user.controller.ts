import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../database/prisma.connection";
import { v4 as uuid } from 'uuid'

class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password, username } = req.body;
    try {
      const findEmail = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (findEmail) {
        return res
          .status(400)
          .json({ success: false, msg: "Email already registered" });
      }
      const hashPass = await bcrypt.hash(password, 10);
      const token = uuid()
      const userCreated = await db.user.create({
        data: {
          email,
          name,
          password: hashPass,
          username,
          token
        },
      });
      if (userCreated) {
        return res.status(201).json({ success: true, msg: "User created" });
      }
      return res.status(400).json({ success: false, msg: "User not created" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const users = await db.user.findMany();
      if (users) {
        return res.status(200).json({ success: true, data: users });
      }
      return res.status(404).json({ success: false, msg: "Users not found" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        return res.status(200).json({ success: true, data: user });
      }
      return res.status(404).json({ success: false, msg: "User not found" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, username } = req.body;
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
      const userUpdate = await db.user.update({
        data: {
          email,
          name,
          username,
        },
        where: {
          id,
        },
      });
      if (userUpdate) {
        return res.status(200).json({ success: true, msg: "User updated" });
      }
      return res.status(400).json({ success: false, msg: "User not updated" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await db.user.delete({
        where: {
          id,
        },
      });
      return res.status(200).json({ success: true, msg: "User deleted" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error Database" });
    }
  }
}

export default UserController;
