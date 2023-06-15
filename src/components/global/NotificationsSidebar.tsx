import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthContext";
import { NotificationsContext } from "../../providers/NotificationsContext";
import "./../../styles/components/global/NotificationsSidebar.scss";
import { generateComponentKey } from "../../utils/generateComponentKey";
import { useNavigate } from "react-router-dom";

import {
    KeyboardDoubleArrowRight,
    Check,
    Delete,
    Warning,
    Announcement,
    Notifications,
    Groups,
} from "@mui/icons-material";
import { Icon } from "@mui/material";

export default function NotificationsSidebar() {
    const context = useContext(NotificationsContext);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    function goTo(path: string) {
        navigate(path);
    }

    useEffect(() => {
        fetchNotifications();

        setInterval(fetchNotifications, 15000);
    }, []);

    function fetchNotifications() {
        fetch(`/api/notifications`, {
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                if (d.status != 200) return;

                context.setNotifications(d.data);
            });
    }

    function deleteNotification(data: any, ev: any) {
        fetch(`/api/notifications/${data._id}/delete`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                if (d.status != 200) return;

                context.setNotifications(context.notifications?.filter((n) => n._id != data._id));

                if (data.extra.redirect && ev.target.className == "notification") {
                    goTo(data.extra.redirect);
                    handleClose();
                }
            });
    }

    function clearNotifications() {
        fetch(`/api/notifications/clear`, {
            method: "POST",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                if (d.status != 200) return;

                context.setNotifications([]);
            });
    }

    function handleClose() {
        context.setOpen(false);
    }

    function handleAuxClose(ev: any) {
        if (ev.target.className == "notifications-sidebar") {
            context.setOpen(false);
        }
    }

    return (
        <div
            className={context.open ? "notifications-sidebar" : "notifications-sidebar closed"}
            onClick={handleAuxClose}>
            <div className="container">
                <div className="title">
                    Notifications{" "}
                    <KeyboardDoubleArrowRight onClick={handleClose} className="close-icon" />
                </div>
                <div className="notifications" key={generateComponentKey(20)}>
                    <div className="clear-container" onClick={clearNotifications}>
                        <Delete />
                        Clear all notifications
                    </div>
                    {context.notifications == null
                        ? null
                        : context.notifications.map((notification) => {
                              return (
                                  <div
                                      key={generateComponentKey(20)}
                                      className={"notification"}
                                      onClick={(ev) => {
                                          deleteNotification(notification, ev);
                                      }}>
                                      <div className="content-container">
                                          <div className="icon">
                                              <Icon>
                                                  {notification.extra?.icon || "notifications"}
                                              </Icon>
                                          </div>
                                          <p className="content">{notification.content}</p>
                                      </div>
                                      <div
                                          className="dimiss-container"
                                          onClick={(ev) => {
                                              deleteNotification(notification._id, ev);
                                          }}>
                                          <Check />
                                      </div>
                                  </div>
                              );
                          })}
                </div>
            </div>
        </div>
    );
}
