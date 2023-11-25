package com.example.twitchchat;

import com.github.philippheuer.credentialmanager.domain.OAuth2Credential;
import com.github.twitch4j.TwitchClient;
import com.github.twitch4j.TwitchClientBuilder;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;



@SpringBootApplication
@RestController
public class TwitchChatApplication {
    private String Oauth = "";

    @Autowired
    private WebSocketChatHandler webSocketChatHandler;
    @Autowired
    private ResourceLoader resourceLoader;
    private HashMap<String, Boolean> filterWords;

    public static void main(String[] args) {
        SpringApplication.run(TwitchChatApplication.class, args);
    }

    @PostConstruct
    public void init() {
        addFilterWords();

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
//                if (!containsFilterWord(chatMessage)) {
                    webSocketChatHandler.sendChatMessage(chatMessage);
//                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        });
    }

    public void addFilterWords() {
        filterWords = new HashMap<>();
        try {
            Resource resource = resourceLoader.getResource("classpath:filterWords.txt");
            File file = resource.getFile();
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String word = scanner.nextLine().trim();
                filterWords.put(word, true);
            }
            scanner.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public boolean containsFilterWord(String chatMessage) {
        for (String filterWord : filterWords.keySet()) {
            if (chatMessage.toLowerCase().contains(filterWord.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

}
