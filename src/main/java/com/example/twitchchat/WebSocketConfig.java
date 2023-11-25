package com.example.twitchchat;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.beans.factory.annotation.Autowired;

import java.net.UnknownHostException;
import java.net.InetAddress;
import java.net.UnknownHostException;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    private WebSocketChatHandler webSocketChatHandler;
    private String myIPAddress;

    public WebSocketConfig() {
        try {
            myIPAddress = InetAddress.getLocalHost().getHostAddress();
//            System.out.println(myIPAddress);
        } catch (UnknownHostException a) {
            a.printStackTrace();
        }
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(webSocketChatHandler, "/ws/chat").setAllowedOrigins("*");
    }
}
