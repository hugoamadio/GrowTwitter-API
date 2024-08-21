import { Request, Response } from "express";
import db from "../database/prisma.connection";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

class AuthController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Missed fields" });
    }
    try {
      const findUser = await db.user.findUnique({
        where: {
          email,
        },
      });
      if (!findUser) {
        return res.status(404).json({ success: false, msg: "User not found" });
      }
      if (await bcrypt.compare(password, findUser.password)) {
        const token = uuid();
        await db.user.update({
          data: {
            token,
          },
          where: {
            email,
          },
        });
        return res.status(200).json({ success: true, msg: "Logged", token });
      }
      return res.status(400).json({ success: false, msg: "User not logged" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: "Error database" });
    }
  }
}

export default AuthController;
