import { PrismaClient } from "@prisma/client";
//import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createUser = async (body: any) => {
  let { username, password, name, phone, role } = body;
  //const salt = bcrypt.genSaltSync();
  //password = bcrypt.hashSync(password, salt);

  let result = await prisma.user.create({
    data: {
      username: username,
      password: password,
      name: name,
      phone: phone,
      role: role,
    },
  });
  result.password = "";
  

  return result;
};

const updateUser = async (body: any, params: any) => {
  const { username, password, name, phone, role } = body;
  let result = await prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      id: params.id,
      username: username,
      password: password,
      name: name,
      phone: phone,
      role: role,
    },
  });
  return result;
};

const deleteUser = async (params: any) => {
  const { id } = params;
  let result = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return result;
};

const listUsers = async () => {
  let result = await prisma.user.findMany({
    where: { active: true },
  });
  return result;
};

const getUser = async (params: any) => {
  const { id } = params;
  let result = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export default { createUser, updateUser, deleteUser, listUsers, getUser };
