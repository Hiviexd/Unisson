import { users } from "../../database";
import { LoggerConsumer } from "./LoggerConsumer";

export default async (userId: string) => {
    const logger = new LoggerConsumer("promoteUser");

    logger.printInfo(`Promoting user ${userId} to provider`);

    const user = await users.findOne({ _id: userId });

    if (!user) {
        logger.printError("User not found");
        return;
    }

    if (user.permissions.includes("provider")) {
        logger.printError("User is already a provider");
        return;
    }

    user.permissions = [...user.permissions, "provider"];
    user.hidden = false;

    await user.save();

    logger.printSuccess(`User ${user.username} (${userId}) promoted!`);
};
