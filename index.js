const Discord = require('discord.js');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
const shorten = require('isgd');
const ms = require('parse-ms');
//const db = require('quick-db')

var bot = new Discord.Client();
var prefix = ("§");
var randum = 0;


bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `Manger du bambou | §help | ${bot.guilds.size} serveurs`, type: 0}})
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
            .addField("Prefix", `${prefix}`)
            .addField("Commandes du bot !", "- help : Affiche les commandes du bot \n- uinfos : Montre les infos de la personne \n- ic : InterChat (chat entre les serveurs qui ont le channel interchat) \n- url : raccourcisseur de lien \n- afk : système d'afk \n- servlist : affiche la liste des serveurs du bot")
            .addField("Fun", "- ask : Poser une question (réponse par oui ou non) \n- avatar : Montre l'avatar de la personne \n- say : Fait parler le bot (perm admin requise) \n- hug : Faire un câlin à quelqu'un \n- kiss : faire un bisous à quelqu'un \n- panda : montre un panda \n- frog : fait apparaitre une grenouille \n- hack : hacker quelqu'un \n- aurevoir : dire aurevoir ^^ \n- fakeban : ban quelqu'un")
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
        .addField("ID", `${message.guild.id}`)
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
    if(argsp.some(e => e==="everyone")){
        var emoji = bot.emojis.find("name", "ping")
        message.react(emoji)
    }

    if(argsp.some(e => e==="PandaBot")){
        var emoji = bot.emojis.find("name", "ping")
        message.react(emoji)
        message.channel.send("Je suis occupé là laisse moi :rage:")
    }

    const argsc = message.content.split(' ')
    if (message.content.startsWith(prefix + "react")) {
        if (!argsc[0]) return message.channel.send('Erreur: il faut préciser une réaction')
        if (!argsc[1] == 'loser') {
            message.channel.fetchMessages({ limit: 1 })
                .then(messages => messages.first.react(bot.emojis.find("name", "TakeTheL")));
            message.channel.bulkDelete(1);
        }
    }

    let argsp = message.content.split(' ');
    if(argsp.some(e => e==="panda")){
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Panda")){
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Kappa")){
        var emoji = bot.emojis.find("name", "kappa")
        message.react(emoji)
    }

    if(argsp.some(e => e==="kappa")){
        var emoji = bot.emojis.find("name", "kappa")
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

    if(argsp.some(e => e==="Loser")){
        var emoji = bot.emojis.find("name", "TakeTheL")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Ah")){
        var emoji = bot.emojis.find("name", "AH")
        message.react(emoji)
    }

    if(argsp.some(e => e==="ah")){
        var emoji = bot.emojis.find("name", "AH")
        message.react(emoji)
    }

    if(argsp.some(e => e==="AH")){
        var emoji = bot.emojis.find("name", "AH")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Nani")){
        var emoji = bot.emojis.find("name", "Nani")
        message.react(emoji)
    }

    if(argsp.some(e => e==="nani")){
        var emoji = bot.emojis.find("name", "Nani")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Ban")){
        var emoji = bot.emojis.find("name", "MonokumaBan")
        message.react(emoji)
    }

    if(argsp.some(e => e==="ban")){
        var emoji = bot.emojis.find("name", "MonokumaBan")
        message.react(emoji)
    }

    if(argsp.some(e => e==="Fortnite")){
        var emoji = bot.emojis.find("name", "fertnite")
        message.react(emoji)
    }

    if(argsp.some(e => e==="fortnite")){
        var emoji = bot.emojis.find("name", "fertnite")
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

    var aurevoir = [
        "https://cdn.discordapp.com/attachments/376801013048410113/444246255233794048/c6Eyvg_Z3hE0TF3C2Xts95l68xs.gif"
    ]

    if(message.content.startsWith(prefix + "aurevoir")) {
        let embed = new Discord.RichEmbed()
            .setTitle(`aurevoir ${message.author.username}`)
            .setImage(aurevoir[Math.floor(Math.random() * aurevoir.length)])
            .setColor(Math.floor(Math.random() * 16777214) + 1)
        message.channel.send(embed)
    }

    var hack1 = ["https://media.giphy.com/media/9WC8WTZsFxkRi/giphy.gif"]

    var hack2 = ["https://media.giphy.com/media/93fnLxrcjm8yz1ufmo/giphy.gif"]

    if(message.content.startsWith(prefix + "hack")) {
        let args = message.content.split(' ');
        let hacks = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          message.channel.send("Erreur: tu dois préciser une personne à hacker")
        } else {
            message.channel.startTyping();
            message.delete()
            setTimeout (function() {
                let embedh2 = new Discord.RichEmbed()
                  .setTitle(message.author.username + ` à hacker ${hacks.username}`)
                  .setImage(hack2[Math.floor(Math.random() * hack2.length)])
                  .setColor(Math.floor(Math.random() * 16777214) + 1)
                message.channel.send(embedh2)
                message.channel.stopTyping();
            },3000)
        }
    }

    const fs = require("fs");
    var msg = message;
    
    let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
    if (message.content.startsWith(prefix + "remafk")){
    if (afk[msg.author.id]) {
    delete afk[msg.author.id];
    if (msg.member.nickname === null) {
    msg.channel.send(" re, j'ai enlever votre afk ^^");
    }else{
    msg.channel.send(" re, j'ai enlever votre afk ^^");
    }
    fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
    }else{
    msg.channel.send("Erreur ! Tu es déjà afk");
    }
    }
    
    
    if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
    if (afk[msg.author.id]) {
    return message.channel.send("Erreur ! Tu es déjà afk -_-");
    }else{
    let args1 = msg.content.split(" ").slice(1);
    if (args1.length === 0) {
    afk[msg.author.id] = {"reason" : true};
    msg.delete();
    msg.channel.send(`tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
    }else{
    afk[msg.author.id] = {"reason" : args1.join(" ")};
    msg.delete();
    msg.channel.send(`tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
    }
    fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
    }
    }
        
        var mentionned = message.mentions.users.first();
    if(msg.mentions.users.size > 0) {
    if (afk[msg.mentions.users.first().id]) {
    if (afk[msg.mentions.users.first().id].reason === true) {
    message.channel.send(`@${mentionned.username} est AFK: pas de raison`);
    }else{
    message.channel.send(`@${mentionned.username} est AFK: ${afk[msg.mentions.users.first().id].reason}`);
    }
    }
    }

    var ban = [
        "https://media.giphy.com/media/qPD4yGsrc0pdm/giphy.gif",
        "https://media.giphy.com/media/C51woXfgJdug/giphy.gif",
        "https://media.giphy.com/media/uC9e2ojJn1ZXW/giphy.gif",
        "https://media.giphy.com/media/nsvGtvp0lYDKg/giphy.gif",
    ]

    if(message.content.startsWith(prefix + "fakeban")) {
        message.delete()
        let args = message.content.split(' ');
        let hugs = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
            message.channel.send("Tu dois préciser quelqu'un à ban")
        } else {
            let embedban = new Discord.RichEmbed()
              .setTitle(message.author.username + ` a ban ${hugs.username}`)
              .setImage(ban[Math.floor(Math.random() * ban.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embedban)
        }
    }

    if(message.content.startsWith(prefix + "servlist")) {
        message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** membres`))
        message.channel.send(`**${bot.guilds.size} serveurs | ${bot.users.size} membres**`)
    }

    if(message.content.startsWith(prefix + "frog")) {
        message.channel.send(":frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::white_circle::black_circle::black_circle::white_circle::frog::frog::frog::white_circle::black_circle::black_circle::white_circle: \n:frog::white_circle::black_circle::black_circle::white_circle::black_circle::white_circle::frog::white_circle::black_circle::black_circle::white_circle::black_circle::white_circle: \n:frog::white_circle::black_circle::white_circle::black_circle::black_circle::white_circle::frog::white_circle::black_circle::white_circle::black_circle::black_circle::white_circle: \n:frog::frog::white_circle::black_circle::white_circle::white_circle::frog::frog::frog::white_circle::black_circle::white_circle::white_circle: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:red_circle::red_circle::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::red_circle::red_circle::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle: \n:frog::frog::frog::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog:")
    }

    if(message.content.startsWith(prefix + "membercount")) {
        message.channel.send(`**${message.guild.memberCount} Utilisateurs**`)
    }
    
    //if(message.content.startsWith(prefix + "daily")) {
        //if(message.guild.id!=='436171403469783041') {
            //let cooldown = 8.64e+7;
            //let lastDaily = db.fetch(`lastDaily_${message.author.id}`);
            //if(lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
                //let timeObj = ms(cooldown - (Date.now() - lastDaily));
                //message.channel.send(`tu as déjà colecté ton argent, il faut attendre **${timeObj.hours}h ${timeObj.minutes}m**`);
            //} else {
                //message.channel.send(`!add-money @${message.author.id} 10`)
            //}
        //}
    //}
});

bot.on('guildMemberAdd', member => {
    var bvn_embed = new Discord.RichEmbed()
    .setColor('#E81414')
    .addField("Bienvenue", `Bienvenue ${member.user.username} sur ${member.guild.name} nous somme actuellement ${member.guild.memberCount}`)
    .setImage(member.user.displayAvatarURL)
    .setFooter(`${member.user.username}`)
    .setTimestamp()
    member.guild.channels.find("name", "bienvenue").send(bvn_embed)
})

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(5);
    randum = Math.floor(Math.random() * (max - min +1) + min);
}
