import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
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
  const validPassword = await bcrypt.compare(password, user?.password);
  console.log(validPassword);
  
  if (!validPassword) {
    throw new Error("Invalid User")
  }else return {jwt:generateJWT(user.id,user.username,user.role)}
};

const createUser = async (body: any) => {
  let { username, password, name, phone, role} = body;
  const salt = bcrypt.genSaltSync();
  password = bcrypt.hashSync(password,salt)
  const user = await prisma.user.create({
    data: {
      username: username,
      password: password,
      name: name,
      phone: phone,
      role: role
    },
  }).catch(e => {throw e });
  return {jwt:generateJWT(user.id,username,user.role), msg: "Usuario registrado correctamente"}
}

const generateJWT = (uid = "", username: string, role: string) => {
  const payload = {
    uid,
    username,
    role,
    iat: moment().unix(),
    exp: moment().add(1, "hour").unix(),
  };
  return jwt.encode(payload, process.env.SECRET_JWT_SEED!, "HS256");
};

export default { login, createUser };
