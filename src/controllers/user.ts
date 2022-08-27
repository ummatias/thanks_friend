import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class UserController {
  private userService = new UserService();

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const user = req.body;
    try {
      const created_user = await this.userService.createUser(user);
      return res.status(201).json({
        user: created_user
      });
    } catch (error) {
      return next(error);
    }
  };

  public getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const users = await this.userService.getUsers();
      return res.status(200).json({
        users
      });
    } catch (error) {
      return next(error);
    }
  };

  public getUserByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { email } = req.params;
    try {
      const user = await this.userService.getUserByEmail(email);
      return res.status(200).json({
        user
      });
    } catch (error) {
      return next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    const user = req.body;
    try {
      const updated_user = await this.userService.updateUser(id, user);
      return res.status(200).json({
        user: updated_user
      });
    } catch (error) {
      return next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const deleted_user = await this.userService.deleteUser(id);
      return res.status(200).json({
        user: deleted_user
      });
    } catch (error) {
      return next(error);
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { email, password } = req.body;
    try {
      const user = await this.userService.getUserByEmail(email);
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).json({
          message: 'Invalid password!'
        });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
        expiresIn: '1h'
      });
      return res.status(200).json({
        user,
        token
      });
    } catch (error) {
      return next(error);
    }
  };
}
