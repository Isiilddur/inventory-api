import authService from "../services/auth.service"

const login = async (req: any, res: any) => {

    try {
        let result = await authService.login(req.body);
        res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error);
      }
}

export default {login}