package com.example.twitchchat;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.rmi.server.ExportException;
import java.util.concurrent.CopyOnWriteArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final CopyOnWriteArrayList<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    private static final Logger logger = LoggerFactory.getLogger(WebSocketChatHandler.class);
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        logger.info("New WebSocket connection established. Session ID: {}", session.getId());
    }
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
        logger.info("WebSocket connection closed. Session ID: {}", session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String clientMessage = message.getPayload();
        if ("ping".equals(clientMessage)) {
            session.sendMessage(new TextMessage("pong"));
        }

    }
    public synchronized void sendChatMessage(String chatMessage) throws Exception {
        logger.info("Sending chat message to all active sessions: {}", chatMessage);
        for (WebSocketSession session: sessions) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(chatMessage));
            }
        }
    }
}
