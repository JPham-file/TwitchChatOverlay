package com.example.twitchchat;

import com.github.philippheuer.credentialmanager.domain.OAuth2Credential;
import com.github.twitch4j.TwitchClient;
import com.github.twitch4j.TwitchClientBuilder;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TwitchChatApplication {
    private String Oauth = "";

    @Autowired
    private WebSocketChatHandler webSocketChatHandler;

    public static void main(String[] args) {
        SpringApplication.run(TwitchChatApplication.class, args);
    }

    @PostConstruct
    public void init() {
        OAuth2Credential credential = new OAuth2Credential("twitch", Oauth);

        TwitchClient twitchClient = TwitchClientBuilder.builder()
                .withChatAccount(credential)
                .withEnableChat(true)
                .build();

        twitchClient.getChat().joinChannel("xqc");
        twitchClient.getEventManager().onEvent(com.github.twitch4j.chat.events.channel.ChannelMessageEvent.class, event -> {
            String userName = event.getUser().getName();
            String userChatMessage = event.getMessage();
            String chatMessage = userName + ": " + userChatMessage;
//            System.out.println(chatMessage);

            try {
                webSocketChatHandler.sendChatMessage(chatMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }

        });

    }

}
