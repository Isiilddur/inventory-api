import { PrismaClient } from "@prisma/client";
//import bcrypt from "bcrypt";
import jwt from "jwt-simple";
import moment from "moment";
import { resolve } from "path";
const prisma = new PrismaClient();

const login = async (body: any) => {
  const { username, password } = body;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      username: username,
    },
  });
  /*const validPassword = bcrypt.compare(password, user?.password);
  if (!validPassword) {
    throw new Error("Invalid User")
  }else*/ return generateJWT(user.id,user.username,user.role)
};

const generateJWT = (uid = "", username: string, role: string) => {
  const payload = {
    uid,
    username,
    role,
    iat: moment().unix(),
    exp: moment().add(1, "hour").unix(),
  };
  return jwt.encode(payload, "TOPSECRET", "HS256");
};

export default { login };
