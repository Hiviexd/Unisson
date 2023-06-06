import { notifications, users } from "../../database";
import crypto from "crypto";
import { LoggerConsumer } from "./LoggerConsumer";

export class NotificationsManager {
    user: any;
    logger = new LoggerConsumer("Notifications Manager");

    constructor(user?: any) {
        this.user = user;
    }

    async createNotification(target: string, content: string, extra?: any) {
        this.logger.printWarning(`Creating notification for ${target}`);

        await notifications.create({
            _id: this.generateId(),
            target,
            content,
            createdAt: new Date(),
            extra,
        });

        this.logger.printSuccess(`Notification created for ${target}`);
    }

    generateId() {
        return crypto.randomBytes(20).toString("hex").slice(20);
    }
}
