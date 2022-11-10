import authService from "../services/auth.service"

const login = async (req: any, res: any) => {

    try {
        let result = await authService.login(req.body);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({msg:"Credenciales Incorrectas"});
      }
}

const createUser = async (req: any, res: any) => {

  try {
      let result = await authService.createUser(req.body);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({msg:"Registro Incorrecto", error:error});
    }
}


export default {login, createUser}