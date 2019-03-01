const Discord = require('discord.js');
const Cleverbot = require("cleverbot-node");
const shorten = require('isgd');
const math = require('mathjs');
const fetch = require('node-fetch');
var fs = require('fs');
var mysql = require('mysql');
var apikey = "UvgdLgy6ZnYj8zGKJ2VtX8SEjoCnQNTl"

var bot = new Discord.Client();
var prefix = "pb!"
var randum = 0;
var randum2 = 0;
var version = "2.0.0"
var epref = "**❌ | "

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: `Version ${version} | ${prefix}help`, type: 0}})
    bot.user.setStatus("dnd");
    bot.user.setAvatar('./pandou.png')
    bot.user.setUsername("PandouBot")
    console.log("Bot Prêt !");
});

bot.login(process.env.TOKEN)

bot.on('message', message => {
    var me = bot.users.get("191907565230096386");
    if (message.content.startsWith(prefix + "help")){
        var emoji = bot.emojis.find("name", "pbletterbox")
        message.react(emoji)
        var emoji = bot.emojis.find("name", "pbverified")
        message.reply(`${emoji} Menu de help envoyé en privé`)
        message.author.createDM().then(function (channel){
            var help_embed = new Discord.RichEmbed()
                .setColor('#E81414')
                .addField("Prefix", `${prefix}`)
                .addField("Commandes du bot !", "- help : Affiche les commandes du bot \n- uinfos : Montre les infos de la personne \n- url : raccourcisseur de lien \n- afk : système d'afk \n- servlist : affiche la liste des serveurs du bot \n- mc : affiche le nombre de membres sur votre serveur \n- invite : lien pour inviter le bot sur votre serveur \n- suggest : envoie une suggestion pour le bot au créateur (tout abus sera sanctionné par un ban de la commande)")
                .addField("Fun", "- ask : Poser une question (réponse par oui ou non) \n- avatar : Montre l'avatar de la personne \n- say : Fait parler le bot (perm admin requise) \n- hug : Faire un câlin à quelqu'un \n- kiss : faire un bisous à quelqu'un \n- panda : montre un panda \n- frog : fait apparaitre une grenouille \n- hack : hacker quelqu'un \n- aurevoir : dire aurevoir ^^ \n- fakeban : ban quelqu'un \n- roll : faire un chiffre entre 0 et 100 \n- gif : cherche un gif \n- calc : fait un calcul")
                .addField("Autres", "- InterChat: chat entre les serveurs qui ont un channel nommé ``interchat`` (pour l'activer, créez juste un channel nommé ``interchat``) (tout abus sera sanctionné par un ban de la commande) \n- Ajout de réactions à certains mots clés: ``kappa``, ``fortnite``, ``ah``, ``loser``, ``nani``, ``panda``, ``ban``")
                .addField("Réaction role", "[Veuillez cliquer pour voir la vidéo afin d'utiliser le reaction role](https://youtu.be/uPBxsg0L27I) \n(toutes les commandes sont disponibles à l'inverse pour supprimer: il suffit de remplacer ``add`` par ``remove``)")
                .addField("Informations", `Bot créé par ${me.tag}, Version ${version}, sur ${bot.guilds.size} serveurs`)
                .addField("Réseaux Sociaux", "[YouTube](https://youtube.com/c/CallMeGodness) [Twitter](https://twitter.com/CallMePandaYT)")
                .addField("Serveur Support", "[Discord Support](https://discord.gg/sWhNKEn)")
                .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
                .setTimestamp()
            channel.sendEmbed(help_embed);
            bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __help__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
        })
    }

    if(message.content.startsWith(prefix + "suggest")){
        if (message.author.id === "idofbanned" || message.author.id === "idofbanned") return message.channel.send(epref + "Tu as été banni de cette commande**");
        var args = message.content.split(" ").slice(1);
        if(!args[0]) return message.reply(epref + `il faut préciser une suggestion**`);
        var suggesttext = args.join(" ");
        var suggestembed = new Discord.RichEmbed()
            .setColor('#3DBFCB')
            .addField("Serveur", message.guild.name, true)
            .addField("Pseudo", message.author.username + "#" + message.author.discriminator, true)
            .addField("Id", message.author.id)
            .addField("Suggestion", suggesttext)
            .setThumbnail(message.author.avatarURL)
            .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
            .setTimestamp()
        bot.channels.findAll('name', 'pb-suggest').map(channel => channel.send(suggestembed))
        message.delete()
        var emoji = bot.emojis.find("name", "pbverified")
        message.reply("Votre suggestion à bien été pris en compte " + emoji + " (tout abus sera sanctionné par un ban de la commande)");
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __suggest__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + suggesttext + "**"))
    }

    if(message.content.startsWith(prefix + "patch")){
        if(message.author.id!==`${me.id}`)return message.reply(epref + `Mais Tu n'est pas ${me.tag} :thinking:**`);
        message.delete()
        var patch_embed = new Discord.RichEmbed()
            .setColor('#3DBFCB')
            .addField(`Patch Notes, Version ${version}`, "- Passage en 2.0.0 ! Le PandaBot devient le PandouBot ! \n- Ajout des reactions role custom (voir dans le help) \n- Réglage de bug dans la commande suggest qui faisait crash le bot \n- Amélioration et optimisation du code \n- Ajout de nouveaux gifs pour le ban (merci だれも#2700) \n- mise en place du discord de support dans le invite et le help")
            .setFooter(bot.user.username, `${bot.user.displayAvatarURL}`)
            .setTimestamp()
        message.channel.sendEmbed(patch_embed);
    }

    if(message.content.startsWith(prefix + "invite")){
        var embedinv = new Discord.RichEmbed()
            .setColor('#E81414')
            .addField(`Merci ${message.author.username} de faire confiance au ${bot.user.username} et à son créateur ${me.tag} déjà ${bot.guilds.size} serveurs nous font confiance`, `[Invitation](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8) [Discord Support](https://discord.gg/sWhNKEn)`)
            .setImage("https://cdn.discordapp.com/attachments/381578923294720000/518879495277772837/merce.png")
        message.channel.send(embedinv)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __invite__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if (message.content.startsWith(prefix + "calc")){
        var args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send(epref + `il faut préciser un calcul**`)
        let resp;
        try {
            resp = math.eval(args);
        } catch (e) {
            return message.channel.send(epref + "Ce n'est pas un calcul valide**");
        }
        var embedmath = new Discord.RichEmbed()
            .setColor(0xffffff)
            .addField('Calcul de base', `\`\`\`js\n${args.join('')}\`\`\``)
            .addField('Résultat', `\`\`\`js\n${resp}\`\`\``)
        message.channel.send(embedmath)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __calc__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme calcul **" + args + "** et comme résultat **" + resp + "**"))
    }

    if (message.content.startsWith(prefix + "gif")){
        var args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send(epref + `il faut faire ${prefix}gif <recherche>**`)
            fetch('http://api.giphy.com/v1/stickers/search?api_key=' + apikey + '&q=' + args)
            .then(res => res.json())
            .then(body => {
                message.channel.send(body["data"]["1"].url)
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __gif__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme recherche **" + args + "**"))
            })
            .catch(err => {
                console.log(err)
                message.channel.send(epref + "Cette recherche ne donne rien**")
            })
    }

    if (message.content.startsWith(prefix + "ping")){
        message.channel.sendMessage('Temps de latence avec le serveur `' + `${message.createdTimestamp - Date.now()}` + ' ms`');
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __ping__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if(message.content.startsWith(prefix + "update")){
        bot.user.setPresence({ game: { name: `Manger du bambou | ${prefix}help | ${bot.guilds.size} serveurs`, type: 0}})
        bot.user.setStatus("dnd");
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __update__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if (message.content.startsWith(prefix + "say")){
        var args = message.content.split(" ").slice(1);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(epref + `Tu n'as pas la permission ADMINISTRATOR**`);
        message.delete()
        var botmsg = args.join(" ");
        message.channel.send(botmsg)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __say__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + botmsg + "**"))
    }

    if (message.content.startsWith(prefix + "forcesay")){
        var args = message.content.split(" ").slice(1);
        if(message.author.id!==`${me.id}`)return message.reply(epref + `Mais Tu n'est pas ${me.tag} :thinking:**`);
        message.delete()
        var botmsg = args.join(" ");
        message.channel.send(botmsg)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __forcesay__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + botmsg + "**"))
    }

    if (message.content.startsWith(prefix + "ask")){
        let askargs = message.content.split(" ").slice(1);
        let ask1 = askargs.join(" ")
        if(!ask1) return message.channel.sendMessage(epref + "Merci de préciser une question**")
        random();
        if (randum == 1){
            var askres = "Oui"
            message.channel.sendMessage("Oui");
            console.log(randum);
        }
        if (randum == 2){
            var askres = "Non"
            message.channel.sendMessage("Non");
            console.log(randum);
        }
        if (randum == 3){
            var askres = "Peut-être"
            message.channel.sendMessage("Peut-être");
            console.log(randum);
        }
        if (randum == 4){
            var askres = "Jamais"
            message.channel.sendMessage("Jamais");
            console.log(randum);
        }
        if (randum == 5){
            var askres = "Biensûr"
            message.channel.sendMessage("Biensûr");
            console.log(randum);
        }
        if (randum == 0){
            var askres = "Je nes sais pas"
            message.channel.sendMessage("Je ne sais pas");
            console.log(randum);
        }
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __ask__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + ask1 + "** Avec la réponse **" + askres + "**"))
    }

    if (message.content.startsWith(prefix + "roll")){
        random2();
        if (randum2 < 5){
            message.channel.sendMessage(`Echec Critique **${randum2}**`);
            console.log(randum2);
        }
        else if (randum2 > 95){
            message.channel.sendMessage(`Réussite Critique **${randum2}**`);
            console.log(randum2);
        }
        else{
            message.channel.sendMessage(`Roll: **${randum2}**`);
            console.log(randum2);
        }
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __roll__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme nombre **" + randum2 + "**"))
    }

    if (message.content.startsWith(prefix + "avatar")) {
        if (!message.mentions.users.first()) return message.channel.send(epref + "Entrez un utilisateur.**")
            let user = message.mentions.users.first() ? message.mentions.users.first() : message.author
            let ava = user.displayAvatarURL
            let embed = {
            color:0x1100FF,
            description:"Avatar de "+user.username+": *[url]("+ava+")*",
            image:{url:ava}
            }
    message.channel.send("", {embed})
    bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __avatar__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** Sur **" + user.tag + "**"))
    }
    
    if (message.content.startsWith(prefix + "poeme")){
        message.channel.send("Sans appuis, sans parents, et seuls en ce monde, \nUnissons nos forces, nos coeurs et nos destins ; \nTissons, toi et moi unis, d'authentiques liens : \nBâtissons à deux une relation réelle et profonde.\n Par la confiance, la franchise et la loyauté, \nQue cette fraternité nous soutienne et nous lie ; \nUn ami doit pour son ami le secourir dans la vie :\nQue nos deux âmes nouées puissent s'entraider.\nNous, main dans la main, bravons nos lendemains,\nEt pour rendre plus doux nos malheurs communs,\nDe deux âmes meurtries, qu'Amitié n'en fasse qu'une.\nSans être frères de sang, devenons frères de coeurs, \nPartageons nos joies et soucis, et nos pires douleurs : \nEt que ces instants partagés, deviennent notre fortune.")
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __poeme__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if(message.content.startsWith(prefix + "uinfos")) {
        if (!message.mentions.users.first()) return message.channel.send(epref + "Entrez un utilisateur.**")
        let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(arguments[0]));
        let uinfoEmbed = new Discord.RichEmbed()
        .setDescription("__UserInfo__")
        .setColor('#00FFE8')
        .addField("Pseudo", `${User.user.username}`)
        .addField("#", `${User.user.discriminator}`)
        .addField("ID", `${User.user.id}`)
        .addField("Créé le", `${User.user.createdAt}`)
        .addField("Bot ?", `${User.user.bot}`)
        //.addField("ID du serveur", `${message.guild.id}`)
        .setThumbnail(User.user.displayAvatarURL);
        message.channel.sendEmbed(uinfoEmbed)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __uinfos__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** Sur **" + User.user.tag + "**"))
        //if (!message.guild.channels.find("name", "modlog")) return message.guild.createChannel('modlog', 'text')
        //message.guild.channels.find("name", "modlog").send("Commande : uinfos / par :" + message.author.username + "#" + message.author.discriminator)
    }

    //if(message.content.startsWith(prefix + "mtonic")) {
        //message.delete()
        //if(message.author.id!=='191907565230096386')return message.reply(`**❌ | Mais Tu n'est pas ${me.tag} :thinking:**`);
        //var aicmton = message.content.split(" ").slice(1);
        //if(!aicmton) return message.reply("**❌ | Merci de préciser un message**")
        //var icmt = "off";
        //var embedicmaintenance = new Discord.RichEmbed()
            //.setColor("0x8BCC14")
            //.setTitle(`Maintenance`)
            //.addField(`Une maintenance à lieu sur cette commande pour`, aicmton)
            //.addField(`Temps de la maintenance`, `Non définie`)
            //.setFooter("PandaBot", `${pandabot.displayAvatarURL}`)
            //.setTimestamp()
        //bot.channels.findAll('name', 'interchat').map(channel => channel.send(embedicmaintenance))
    //}

    //if(message.content.startsWith(prefix + "mtoffic")) {
        //message.delete()
        //if(message.author.id!=='191907565230096386')return message.reply(`**❌ | Mais Tu n'est pas ${me.tag} :thinking:**`);
        //var icmt = "on";
        //var embedicmaintenance = new Discord.RichEmbed()
            //.setColor("0x8BCC14")
            //.setTitle(`Maintenance`)
            //.addField(`La maintenance est fini`, "Merci à tous pour votre compréhension")
            //.setFooter("PandaBot", `${pandabot.displayAvatarURL}`)
            //.setTimestamp()
        //bot.channels.findAll('name', 'interchat').map(channel => channel.send(embedicmaintenance))
    //}

    if(message.content.startsWith(prefix + "annonceall")) {
        if(message.author.id!=='191907565230096386')return message.reply(epref + `Mais Tu n'est pas ${me.tag} :thinking:**`);
        message.delete()
        let aallargs = message.content.split(" ").slice(1);
        let aall = aallargs.join(" ")
        if(!aall) return message.reply(epref + "Merci de préciser un message**")
        bot.channels.findAll('name', 'annonce').map(channel => channel.send(aall))
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __annonceall__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + aall + "**"))
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
        let hugs = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          let base = new Discord.RichEmbed()
            .setTitle('Viens, je te fait un câlin !')
                    .setImage(hug[Math.floor(Math.random() * hug.length)])
                    .setColor(Math.floor(Math.random() * 16777214) + 1)
          message.channel.send(base)
          bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __hug__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** tout seul"))
        } else {
            let embed = new Discord.RichEmbed()
              .setTitle(message.author.username + ` fait un câlin à ${hugs.username}`)
              .setImage(hug[Math.floor(Math.random() * hug.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embed)
            bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __hug__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** sur **" + hugs.tag + "**"))
        }
    }
    
    if(message.content.startsWith(prefix + "url")) {
        var args = message.content.split(" ").slice(1);
        if(!args[0]) return message.channel.send(epref + `**il faut faire ${prefix}url <URL>**`)
        if(!args[1]) {
            shorten.shorten(args[0], function(res) {
                if(res.startsWith('Error:')) return message.channel.send(epref + 'tu dois mettre un lien valide**');
                message.channel.send(`**<${res}>**`);
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __url__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme url de base **" + args + "** pour finir en **" + res + "**"))
            })
        } else {
            shorten.custom(args[0], args[1], function(res){
                if(res.startsWith('Error:')) return message.channel.send(`**${res}**`);
                message.channel.send(`**<${res}>**`);
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __url__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme url de base **" + args + "** pour finir en **" + res + "**"))
            })
        }
    }

    let argsp = message.content.split(' ');
    if(argsp.some(e => e==="@everyone")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "ping")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="pandabot")){
        if(message.author.id==`${bot.user.id}`)return;
        if(message.author.id==`${me.id}` || message.author.id==`400730824254685185`){
            var emoji = bot.emojis.find("name", "ws10")
            message.react(emoji)
            message.channel.send("Je t'aime :heartpulse:")
        } else if(message.author.id==`281717114237091840`) {
            message.channel.send("L'empereur des Sxmourais est là, prosternez vous !")
        } else {
            var emoji = bot.emojis.find("name", "ping")
            message.react(emoji)
            message.channel.send("Je suis occupé là laisse moi :rage:")
        }
    }

    //const argsc = message.content.split(' ')
    //if (message.content.startsWith(prefix + "react")) {
        //if (!argsc[0]) return message.channel.send('Erreur: il faut préciser une réaction')
        //if (!argsc[1] == 'loser') {
            //message.channel.fetchMessages({ limit: 1 })
                //.then(messages => messages.first.react(bot.emojis.find("name", "TakeTheL")));
            //message.channel.bulkDelete(1);
        //}
    //}

    if(argsp.some(e => e.toLowerCase()==="panda")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="kappa")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbkappa")
        message.react(emoji)
    }

    if(message.content.startsWith(prefix + "panda")) {
        var emoji = bot.emojis.find("name", "PandaGeant")
        message.channel.send("Voici un panda " + emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="loser")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbTakeTheL")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="ah")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbAH")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="nani")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbNani")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="ban")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbMonokumaBan")
        message.react(emoji)
    }

    if(argsp.some(e => e.toLowerCase()==="fortnite")){
        if(message.author.id==bot.user.id)return;
        var emoji = bot.emojis.find("name", "pbfertnite")
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
        let kisss = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          let base = new Discord.RichEmbed()
            .setTitle('Viens, je te fait un bisous !')
            .setImage(kiss[Math.floor(Math.random() * kiss.length)])
            .setColor(Math.floor(Math.random() * 16777214) + 1)
          message.channel.send(base)
          bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __kiss__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** tout seul"))
        } else {
            let embed = new Discord.RichEmbed()
              .setTitle(message.author.username + ` fait un bisous à ${kisss.username}`)
              .setImage(kiss[Math.floor(Math.random() * kiss.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embed)
            bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __kiss__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** sur **" + kisss.tag + "**"))
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
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __aurevoir__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }


    var hack2 = ["https://media.giphy.com/media/93fnLxrcjm8yz1ufmo/giphy.gif"]

    if(message.content.startsWith(prefix + "hack")) {
        let hacks = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
          message.channel.send(epref + "tu dois préciser une personne à hacker**")
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
            bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __hack__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** sur **" + hacks.tag + "**"))
        }
    }

    const fs = require("fs");
    var msg = message;
    
    let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
    if (message.content.startsWith(prefix + "remafk")){
        if (afk[msg.author.id]) {
            delete afk[msg.author.id];
            if (msg.member.nickname === null) {
                msg.channel.send("J'ai enlever votre afk");
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __remafk__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
            }else{
                msg.channel.send("J'ai enlever votre afk");
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __remafk__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
            }
            fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
        }else{
            msg.channel.send(epref + "Tu es déjà afk**");
        }
    }
    
    
    if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
        if (afk[msg.author.id]) {
            return message.channel.send(epref + "Tu es déjà afk**");
        }else{
            let args1 = msg.content.split(" ").slice(1);
            if (args1.length === 0) {
                afk[msg.author.id] = {"reason" : true};
                msg.delete();
                msg.channel.send(`Tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __afk__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** sans raison"))
            }else{
                afk[msg.author.id] = {"reason" : args1.join(" ")};
                msg.delete();
                msg.channel.send(`Tu es désormais afk, met **${prefix}remafk** pour enlever ton afk`).then(x => DeleteQueue.add(x, 10000));
                bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __afk__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme raison **" + afk[msg.author.id].reason + "**"))
            }
            fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
        }
    }
        
    var mentionned = message.mentions.users.first();
    if(msg.mentions.users.size > 0) {
        if (afk[msg.mentions.users.first().id]) {
            if (afk[msg.mentions.users.first().id].reason === true) {
                message.channel.send(`${mentionned.username} est AFK: pas de raison`);
            }else{
                message.channel.send(`${mentionned.username} est AFK: ${afk[msg.mentions.users.first().id].reason}`);
            }
        }
    }

    var ban = [
        "https://media.giphy.com/media/qPD4yGsrc0pdm/giphy.gif",
        "https://media.giphy.com/media/C51woXfgJdug/giphy.gif",
        "https://media.giphy.com/media/uC9e2ojJn1ZXW/giphy.gif",
        "https://media.giphy.com/media/nsvGtvp0lYDKg/giphy.gif",
        "https://cdn.discordapp.com/attachments/550393834941579264/550623611040563211/BZIyPaS.gif",
        "https://cdn.discordapp.com/attachments/550393834941579264/550623611648606208/O3DHIA5.gif",
        "https://cdn.discordapp.com/attachments/550393834941579264/550624026486112256/tenor-3.gif",
        "https://cdn.discordapp.com/attachments/550393834941579264/550624082346115072/5ec.gif",
        "https://cdn.discordapp.com/attachments/550393834941579264/550625258491609098/giphy.gif",
    ]

    if(message.content.startsWith(prefix + "fakeban")) {
        message.delete()
        let fban = message.mentions.users.first();
        if (message.mentions.users.size < 1) {
            message.channel.send(epref + "Tu dois préciser quelqu'un à ban**")
        } else {
            let embedban = new Discord.RichEmbed()
              .setTitle(message.author.username + ` a ban ${fban.username}`)
              .setImage(ban[Math.floor(Math.random() * ban.length)])
              .setColor(Math.floor(Math.random() * 16777214) + 1)
            message.channel.send(embedban)
            bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __fakeban__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** sur **" + fban.tag + "**"))
        }
    }

    if(message.content.startsWith(prefix + "servlist")) {
        console.log(bot.guilds.map(r => r.name + ` | ${r.memberCount} membres`))
        console.log(`${bot.guilds.size} serveurs | ${bot.users.size} membres`)
        message.channel.send("La liste des serveurs à été envoyé dans la console")
        message.channel.send(`**${bot.guilds.size} serveurs | ${bot.users.size} membres**`)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __servlist__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if(message.content.startsWith(prefix + "frog")) {
        message.delete()
        message.channel.send(":frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::white_circle::black_circle::black_circle::white_circle::frog::frog::frog::white_circle::black_circle::black_circle::white_circle: \n:frog::white_circle::black_circle::black_circle::white_circle::black_circle::white_circle::frog::white_circle::black_circle::black_circle::white_circle::black_circle::white_circle: \n:frog::white_circle::black_circle::white_circle::black_circle::black_circle::white_circle::frog::white_circle::black_circle::white_circle::black_circle::black_circle::white_circle: \n:frog::frog::white_circle::black_circle::white_circle::white_circle::frog::frog::frog::white_circle::black_circle::white_circle::white_circle: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:red_circle::red_circle::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::red_circle::red_circle::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle: \n:frog::frog::frog::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle::red_circle: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog::frog: \n:frog::frog::frog::frog::frog::frog::frog::frog::frog:")
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __frog__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "**"))
    }

    if(message.content.startsWith(prefix + "mc")) {
        message.channel.send(`**${message.guild.memberCount} Utilisateurs**`)
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __mc__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec **" + message.guild.memberCount + " Utilisateurs**"))
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

    if(message.channel.name !== 'interchat') return;
    if(message.author.bot) return;
    else {
        //message.channel.send(icmt)
        //if( icmt == "on"){
        if (message.author.id === "idofbanned" || message.author.id === "idofbanned") return message.channel.send(epref + "Tu as été banni de l'interchat**");
            //                      Banned id
        if(message.author.id==`${me.id}`){
            var emoji = bot.emojis.find("name", "PandaGeant")
            var rank = `Créateur (${emoji})`
            var colorembed = "#E81414"
        }else if(message.author.id==`400730824254685185`){
            var emoji = bot.emojis.find("name", "PandaGeant")
            var rank = `Princesse (${emoji})`
            var colorembed = "FF00A2"
        }else if(message.author.id==`300337658230603776` || message.author.id==`536913877133295616`){
            var emoji = bot.emojis.find("name", "pbhackerman")
            var rank = `Développeur (${emoji})`
            var colorembed = "0x1100FF"
        }else if(message.author.id==`281717114237091840`){
            var emoji = bot.emojis.find("name", "pbkappa")
            var rank = `Ami (${emoji})`
            var colorembed = "B600FF"
        }else{
            var emoji = bot.emojis.find("name", "pbverified")
            var rank = `Membre (${emoji})`
            var colorembed = "0x8BCC14"
        }
        message.delete()
        let blacklisted = ['https://', 'http://', 'raid', 'discord', 'hack', '`']
        let foundInText = false
        for (var i in blacklisted) {
            if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
        }
        if (foundInText) {
            message.channel.send(epref + "Un mot dans votre phrase est blacklist ou est un caractère non autotrisé**");
        } else {
        var embedglobal = new Discord.RichEmbed()
            .setColor(`${colorembed}`)
            .setAuthor(`InterChat`, message.guild.iconURL)
            .addField("Serveur", message.guild.name, true)
            .addField("Pseudo", message.author.username + "#" + message.author.discriminator, true)
            .addField("Id", message.author.id)
            .addField("Grade dans l'interchat", rank)
            .addField("Message", `${message.content}`)
            .setThumbnail(message.author.avatarURL)
            .setFooter(`${bot.user.username} (tout abus sera sanctionné par un ban de la commande)`, `${bot.user.displayAvatarURL}`)
            .setTimestamp()
        bot.channels.findAll('name', 'interchat').map(channel => channel.send(embedglobal))
        bot.channels.findAll('name', 'logs-pandabot').map(channel => channel.send("Commande : __ic__ par : **" + message.author.tag + "** Dans **" + message.guild.name + "** / **" + message.channel.name + "** avec comme message **" + message.content + "**"))
        }
        //} else if(icmt == "off") {
            //var embedicmaintenance = new Discord.RichEmbed()
                //.setColor("0x8BCC14")
                //.setTitle(`Maintenance`)
                //.addField(`Une maintenance à lieu sur cette commande pour`, aicmton)
                //.addField(`Temps de la maintenance`, `Non définie`)
                //.setFooter("PandaBot", `${pandabot.displayAvatarURL}`)
                //.setTimestamp()
            //message.channel.sendEmbed(embedicmaintenance)
        //}
    }

});

bot.on('guildMemberAdd', member => {
    if(!member.guild.channels.find("name", "bienvenue")) return;
    var bvn_embed = new Discord.RichEmbed()
    .setColor('#E81414')
    .addField("Bienvenue", `Bienvenue ${member.user.username} sur ${member.guild.name} nous sommes actuellement ${member.guild.memberCount} Membres`)
    .setImage(member.user.displayAvatarURL)
    .setFooter(`${member.user.username}`)
    .setTimestamp()
    member.guild.channels.find("name", "bienvenue").send(bvn_embed)
})

var readfile = '{}';
if(fsExistsSync('guilds.json')) {
  readfile = fs.readFileSync('guilds.json');
}
var guilds = JSON.parse(readfile);

bot.on('message', async (message) => {
  var emoji = bot.emojis.find("name", "pbverified")
  if(message.member.id === bot.user.id) return;
  msgSplit = message.content.split(' ');
  while(msgSplit.indexOf('') > -1) {
    msgSplit.splice(msgSplit.indexOf(''), 1);
  }
  if(!(message.member.guild.id in guilds)) {
    guilds[message.member.guild.id] = {
      "activechannel": message.channel.id,
      "messages": [],
      "emojiForRole": {},
      "emojiIDForRole": {}
    };
  }
  if(msgSplit[0] == 'pb!addreaction' && msgSplit.length >= 3 && msgSplit[1].startsWith("<@&") && await message.member.hasPermission("ADMINISTRATOR")) {
    var roleid = msgSplit[1].split("<@&")[1].split(">")[0];
    if(msgSplit[2].startsWith("<:")) {
      var emojiId = msgSplit[2].split(":")[2].split(">")[0];
      guilds[message.member.guild.id]["emojiIDForRole"][emojiId] = roleid;
    } else {
      guilds[message.member.guild.id]["emojiForRole"][msgSplit[2]] = roleid;
    }
    message.reply(emoji + ` Reaction ajoutée avec succès`)
  }
  if(msgSplit[0] == "pb!removereaction" && msgSplit.length >= 2 && await message.member.hasPermission("ADMINISTRATOR")) {
    if(msgSplit[2].startsWith("<:")) {
      var emojiId = msgSplit[2].split(":")[2].split(">")[0];
      delete guilds[message.member.guild.id]["emojiIDForRole"][emojiId];
    } else {
      delete guilds[message.member.guild.id]["emojiForRole"][msgSplit[2]];
    }
    message.reply(emoji + ` Réaction retirée avec succès`)
  }
  if(msgSplit[0] == 'pb!addmessage' && msgSplit.length >= 2 && await message.member.hasPermission("ADMINISTRATOR")) {
    if(guilds[message.member.guild.id]["activechannel"] === "") message.reply("Veuillez activer un channel avec : *setchannel #channel");
    guilds[message.member.guild.id]["messages"].push(msgSplit[1]);
    try {
      message.reply(emoji + " Message ajouté avec succès")
      let msg = await bot.channels.get(guilds[message.member.guild.id]["activechannel"]).fetchMessage(msgSplit[1]);
      for(let emote in guilds[message.member.guild.id]["emojiIDForRole"]) {
        await msg.react(emote);
      }
      for(let emote in guilds[message.member.guild.id]["emojiForRole"]) {
        await msg.react(emote);
      }
    } catch(error) {
      message.reply("Ce message n'a pas été trouvé dans le channel actif");
    }
  }
  if(msgSplit[0] == 'pb!removemessage' && msgSplit.length >= 2 && await message.member.hasPermission("ADMINISTRATOR")) {
    let index = guilds[message.member.guild.id]["messages"].indexOf(msgSplit[1]);
    if(index > -1) {
      guilds[message.member.guild.id]["messages"].splice(index, 1);
    }
    try {
      message.reply(emoji + " Message retiré avec succès")
      let msg = await bot.channels.get(guilds[message.member.guild.id]["activechannel"]).fetchMessage(msgSplit[1]);
      msg.clearReactions();
    } catch(error) {
      message.reply("Ce message n'a pas été trouvé dans le channel actif mais a été supprimé de la base de données");
    }
  }
  if(msgSplit[0] == 'pb!setchannel' && msgSplit.length >= 2 && await message.member.hasPermission("ADMINISTRATOR") && msgSplit[1].startsWith("<#")) {
    message.reply(emoji + " Channel ajouté avec succès")
    guilds[message.member.guild.id]["activechannel"] = msgSplit[1].split("<#")[1].split(">")[0];
  }
  saveData();
});

bot.on('raw', event => {
  if((event['t'] == 'MESSAGE_REACTION_ADD' || event['t'] == 'MESSAGE_REACTION_REMOVE') && event.d.user_id !== bot.user.id) { 
    if(event.d.guild_id in guilds) {
      var guild = bot.guilds.get(event.d.guild_id);
      var roleid = "";
      if('emojiForRole' in guilds[event.d.guild_id]) {
        if(event.d.emoji.name in guilds[event.d.guild_id]['emojiForRole'] && guilds[event.d.guild_id]["messages"].some(val => val == event.d.message_id)) {
          roleid = guilds[event.d.guild_id]['emojiForRole'][event.d.emoji.name];

        }
      } 
      if('emojiIDForRole' in guilds[event.d.guild_id]) {
        if(event.d.emoji.id in guilds[event.d.guild_id]['emojiIDForRole'] && guilds[event.d.guild_id]["messages"].some(val => val == event.d.message_id)) {
          roleid = guilds[event.d.guild_id]['emojiIDForRole'][event.d.emoji.id];
        }
      }

      if(roleid != "") {
        if(event['t'] == 'MESSAGE_REACTION_ADD') {
          guild.fetchMember(event.d.user_id).then(member => member.addRole(guild.roles.get(roleid))).catch(console.error);
        } else if(event['t'] == 'MESSAGE_REACTION_REMOVE') {
          guild.fetchMember(event.d.user_id).then(member => member.removeRole(guild.roles.get(roleid))).catch(console.error);
        }
      }
    }
    
  }
});

function saveData() {
  fs.writeFile('guilds.json', JSON.stringify(guilds), (err) => {
    if(err !== null) {
      console.log(err)
    }
  });
}

function fsExistsSync(myDir) {
  try {
    fs.accessSync(myDir);
    return true;
  } catch (e) {
    return false;
  }
}

function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(5);
    randum = Math.floor(Math.random() * (max - min +1) + min);
}

function random2(min, max) {
    min = Math.ceil(0);
    max = Math.floor(100);
    randum2 = Math.floor(Math.random() * (max - min +1) + min);
}
