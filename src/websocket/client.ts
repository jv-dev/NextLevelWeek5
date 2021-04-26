import { io } from "../http";
import ConnectionsService from "../services/ConnectionsService";
import UsersService from "../services/UserService";
import MessageService from "../services/MessageService";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/UsersRepository";


interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messageService = new MessageService();
  const userRepo = getCustomRepository(UsersRepository);

  socket.on("client_first_access", async(params) => {
    const socket_id = socket.id;
    const { text, email } = params as IParams;

    const userExists = await usersService.findByEmail(email);
    let user_id = "";
    
    if(!userExists) {
      const user = await usersService.create(email);

      await connectionsService.create({ socket_id, user_id : user.id});

      user_id = user.id;
    } else {
      const connection = await connectionsService.findByUserId(userExists.id);
      user_id = userExists.id;

      if(connection) {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      } else {
        await connectionsService.create({ socket_id, user_id : userExists.id});
      }
    }

    await messageService.create({text, user_id});

    const allMessages = await messageService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async params => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionsService.findBySocketID(socket_id);
    const user = await userRepo.findOne(user_id);

    const message = await messageService.create({ text, user_id });

    io.to(socket_admin_id).emit("admin_receive_message", { message, user});
  });
});