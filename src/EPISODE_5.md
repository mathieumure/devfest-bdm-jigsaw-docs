# Episode V - Yoda contre-attaque

![Yoda](./images/yoda.jpeg)

Vous êtes maintenant un maître Jedi et maîtriser complètement Jigsaw. Vous n'avez plus besoin de maître et allez maintenant partir seul pour protéger la galaxy.

```sh
cd hands-on-jigsaw-devfest/Yoda-style
```

## Une version sans vertx

Le maitre Jde l'Ordre Mace Windu vous a préparé une version allégée sans vertx.

## Jlink

La maitrise de Jlink est nécessaire à tous maîtres Jedi.
Jlink est un outil permettant de viser la pureté de la force de la JVM en enlevant toutes pensées inutiles qui pourraient obscursir le démarrage de la JVM.

Jlink permet de créer des JRE packagées exclusivement avec les modules nécessaire à votre application. 

Yoda vous a laissé ces indications pour que vous trouviez en vous les modules à utiliser.

Avec BASE_DIR = le répertoire de travail de votre projet.

### Module Path (--module-path )

* Les modules du JDK sont dans ${JAVA_HOME}/jmods
* Les jar générés par gradle sont dans :
  * ${BASE_DIR}/api-starwars/build/libs/api-starwars.jar
  * ${BASE_DIR}/api-starwars-local-impl/build/libs/api-starwars-local-impl.jar
  * ${BASE_DIR}/starwars-http-server/build/libs/starwars-http-server.jar
  * ${BASE_DIR}/diffutils/build/libs/diffutils.jar
  * ${BASE_DIR}/fuzzywuzzy/build/libs/fuzzywuzzy.jar
  
### La liste des modules à ajouter (--add-modules)

Votre JRE optimisé devra contenir les modules suivants :

* org.zenika.handson.jigsaw.api.local.impl
* org.zenika.handson.jigsaw.http

(les dépendences nécessaires sont obtenues par transitivité)

### Le lanceur (--launcher) (optionel)

Votre JRE optimisé peut contenir un script de lancement de votre application. Votre "main class" sera ici dans le module `org.zenika.handson.jigsaw.http` et elle sera `org.zenika.handson.jigsaw.http.Application`

```sh
--launcher death-star-launcher=org.zenika.handson.jigsaw.http/org.zenika.handson.jigsaw.http.Application
```

> "Sur la page [infos](http://localhost:8080/infos), moins de modules tu verras, plus de pouvoir tu auras."


> Avec la commande `./$$nom_de_votre_jre_jlink_/bin/java --list-modules` la sagesse tu connaitras

## Image Docker

Pour parvenir au rang de grand maitre et approcher à la sagesse de Yoda il faut maitriser le pouvoir de contenarisation.
Vous devez créer une image minimaliste en utilisant Jlink dans une première phase de compilation

Pour cela appuyer vous sur les multi-build de docker avec comme images :

* `openjdk:11-jdk-oracle` pour le build
* `debian:sid-slim` pour l'image final

TIPS : lancer le build des jar depuis l'image 0 ainsi ./gradlew --no-daemon clean jar