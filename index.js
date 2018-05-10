const Discord = require('discord.js');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
const shorten = require('isgd');

var bot = new Discord.Client();
var prefix = ("§");
var randum = 0;

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `§help | ${bot.guilds.size} serveurs | ${bot.users.size} utilisateurs`, type: 0}})
    bot.user.setStatus("dnd");
    console.log("Bot Prêt !");
});

bot.login(process.env.TOKEN)

bot.on('message', message => {
    if (message.content.startsWith("test")){
        message.reply("1, 2, 3, c'est bon !");
        console.log('test')
    }

    if (message.content.startsWith(prefix + "help")){
        var help_embed = new Discord.RichEmbed()
            .setColor('#E81414')
            .addField("Prefix", "§")
            .addField("Commandes du bot !", "- help : Affiche les commandes du bot \n- uinfos : Montre les infos de la personne \n- ic : InterChat (chat entre les serveurs qui ont le channel interchat) \n- url : raccourcisseur de lien")
            .addField("Fun", "- ask : Poser une question (réponse par oui ou non) \n- avatar : Montre l'avatar de la personne \n- say : Fait parler le bot (perm admin requise) \n- hug : Faire un câlin à quelqu'un \n- kiss : faire un bisous à quelqu'un \n- panda : montre un panda")
            .setFooter("Bot crée par 🐼CΛLLMΣパンダ🐼#9139")
        message.channel.sendEmbed(help_embed);
        console.log("Commande : help");
    }

    if (message.content.startsWith(prefix + "ping")){
        message.channel.sendMessage('Temps de latence avec le serveur `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        console.log("Commande : ping")
    }

    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    var args = message.content.split(" ").slice(1);  
    if(command === "say"){
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Tu n'as pas la permission ADMINISTRATOR");
    message.delete()
    var botmsg = args.join(" ");
    message.channel.send(botmsg)
    
    }

    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    var args = message.content.split(" ").slice(1);  
    if(command === "forcesay"){
    if(message.author.id!=='191907565230096386')return message.reply("Mais Tu n'est pas 🐼CΛLLMΣパンダ🐼 :thinking:");
    message.delete()
    var botmsg = args.join(" ");
    message.channel.send(botmsg)
    
    }

    if (message.content.startsWith(prefix + "ask")){
        random();
        if (randum == 1){
            message.channel.sendMessage("Oui");
            console.log(randum);
        }
        if (randum == 2){
            message.channel.sendMessage("Non");
            console.log(randum);
        }
        if (randum == 3){
            message.channel.sendMessage("Peut-être");
            console.log(randum);
        }
        if (randum == 4){
            message.channel.sendMessage("Jamais");
            console.log(randum);
        }
        if (randum == 5){
            message.channel.sendMessage("Biensûr");
            console.log(randum);
        }
        if (randum == 0){
            message.channel.sendMessage("Je ne sais pas");
            console.log(randum);
        }
    }

    if (message.content.startsWith(prefix + "avatar")) {
        if (!message.mentions.users.first()) return message.channel.send("**❌ | Entrez un utilisateur.**")
            let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
            let ava = user.displayAvatarURL
            let embed = {
            color:0x1100FF,
            description:"Avatar de "+user.username+": *[url]("+ava+")*",
            image:{url:ava}
            }
    message.channel.send("", {embed})
    }

    if(message.content.startsWith(prefix + "uinfos")) {
        if (!message.mentions.users.first()) return message.channel.send("** ❌ | Entrez un utilisateur.**")
        let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
        let uinfoEmbed = new Discord.RichEmbed()
        .setDescription("__UserInfo__")
        .setColor('#00FFE8')
        .addField("Pseudo", `${User.user.username}`)
        .addField("#", `${User.user.discriminator}`)
        .addField("ID", `${User.user.id}`)
        .addField("Créé le", `${User.user.createdAt}`)
        .addField("Bot ?", `${User.user.bot}`)
        .setThumbnail(User.user.displayAvatarURL);
        message.channel.sendEmbed(uinfoEmbed)
        if (!message.guild.channels.find("name", "modlog")) return message.guild.createChannel('modlog', 'text')
        message.guild.channels.find("name", "modlog").send("Commande : uinfos / par :" + message.author.username + "#" + message.author.discriminator)
    }

    if (message.content.startsWith(prefix + "ic")) {
        message.delete()
        let icargs = message.content.split(" ").slice(1);
        let ic03 = icargs.join(" ")
        var ic02 = message.guild.channels.find('name', 'interchat');
        if(!ic02) return message.reply("Le channel interchat est introuvable")
        if(message.channel.name !== 'interchat') return message.reply("Commande à effectuer dans interchat")
        if(!ic03) return message.reply("Merci de préciser un message")
        var embedglobal = new Discord.RichEmbed()
        .setColor("0x8BCC14")
        .setTitle("InterChat §ic (message)")
        .addField("Pseudo", message.author.username + "#" + message.author.discriminator, true)
        .addField("Serveur", message.guild.name, true)
        .addField("Message", ic03)
        .setFooter("PandaBot")
        .setTimestamp()
    bot.channels.findAll('name', 'interchat').map(channel => channel.send(embedglobal))
    }

    if(message.content.startsWith(prefix + "annonceall")) {
        if(message.author.id!=='191907565230096386')return message.reply("Mais Tu n'est pas 🐼CΛLLMΣパンダ🐼 :thinking:");
        message.delete()
        let aallargs = message.content.split(" ").slice(1);
        let aall = aallargs.join(" ")
        if(!aall) return message.reply("Merci de préciser un message")
        bot.channels.findAll('name', 'annonce').map(channel => channel.send(aall))
    }

    //if (message.channel.type === "dm") {
        //clbot.write(message.content, (response) => {
          //message.channel.startTyping();
          //setTimeout(() => {
            //message.channel.send(response.output).catch(console.error);
            //message.channel.stopTyping();
          //}, Math.random() * (1 - 3) + 1 * 1000);
        //});
    //}

    var hug = [
        "https://media.giphy.com/media/lrr9rHuoJOE0w/giphy.gif",
        "https://media.giphy.com/media/ByJYqLWjvzJwk/giphy.gif",
        "https://media.giphy.com/media/xUPGcz1FByjZlWZKms/giphy.gif",
        "https://cdn.discordapp.com/attachments/304934695806697472/335180737353482242/hug.gif",
        "https://cdn.discordapp.com/attachments/304934695806697472/335180737793753090/hug-1.gif",
    ]

    if(message.content.startsWith(prefix + "hug")) {
        let args = message.content.split(' ');
        let hugs = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          let base = new Discord.RichEmbed()
            .setTitle('Viens, je te fait un câlin !')
                    .setImage(hug[Math.floor(Math.random() * hug.length)])
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
          message.channel.send(base)
        } else {
            let embed = new Discord.RichEmbed()
              .setTitle(message.author.username + ` fait un câlin à ${hugs.username}`)
              .setImage(hug[Math.floor(Math.random() * hug.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embed)
        }
    }
    
    if(message.content.startsWith(prefix + "url")) {
        if(!args[0]) return message.channel.send('**Erreur: il faut faire §url <URL>**')
        if(!args[1]) {
            shorten.shorten(args[0], function(res) {
                if(res.startsWith('Error:')) return message.channel.send('**Erreur tu dois mettre un lien valide**');
                message.channel.send(`**<${res}>**`);
            })
        } else {
            shorten.custom(args[0], args[1], function(res){
                if(res.startsWith('Error:')) return message.channel.send(`**${res}**`);
                message.channel.send(`**<${res}>**`);
            })
        }
    }

    let argsp = message.content.split(' ');
    if(argsp.some(e => e==="panda")){
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.react(emoji)
    }

    if(message.content.startsWith(prefix + "panda")) {
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.channel.send("Voici un panda " + emoji)
    }

    if(argsp.some(e => e==="loser")){
        var emoji = bot.emojis.find("name", "TakeTheL")
        message.react(emoji)
    }

    var kiss = [
        "https://media.giphy.com/media/QGc8RgRvMonFm/giphy.gif",
        "https://media.giphy.com/media/wHbQ7IMBrgTzq/giphy.gif",
        "https://media.giphy.com/media/4dCj46k0Qtyxy/giphy.gif",
        "https://media.giphy.com/media/1rRzqMZzS5uyQ/giphy.gif",
        "https://media.giphy.com/media/11GnTlz9rJ07Mk/giphy.gif",
    ]

    if(message.content.startsWith(prefix + "kiss")) {
        let args = message.content.split(' ');
        let kisss = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          let base = new Discord.RichEmbed()
            .setTitle('Viens, je te fait un bisous !')
                    .setImage(kiss[Math.floor(Math.random() * kiss.length)])
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
          message.channel.send(base)
        } else {
            let embed = new Discord.RichEmbed()
              .setTitle(message.author.username + ` fait un bisous à ${kisss.username}`)
              .setImage(kiss[Math.floor(Math.random() * kiss.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embed)
        }
    }
});

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(5);
    randum = Math.floor(Math.random() * (max - min +1) + min);
}
