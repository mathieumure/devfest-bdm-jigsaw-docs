# Episode III - La revanche des Sith Maven

![Darth Maven](./images/Darth_Maven.jpg)

Le côté obscure est très tentant et vous vous laissez séduire par les pouvoirs de modularisation de Maven, vous prenez alors le nom de **Darth Jigsaw**.

## Devenir un seigneur sith

Les sith allant toujours par deux, vous allez à la rencontre de votre maître **Darth Maven**.

```
cd hands-on-jigsaw-devfest/2-sith
```

Votre maître vous demande de modulariser une application, listant les héros de la galaxie, fonctionnant sous **Java 11** pour la rendre compatible avec les modules de Java.

L'application est composée des plusieurs modules maven:

* `api-starwars`: Le module de base définissant l'interface de définition et requétage des personnages.
* `api-starwars-local-impl`: L'implémentation in-memory de l'interface définie dans `api-starwars`.
* `starwars-vertx-http-server`: Le server Vertx proposant une webapp et une API web utilisant `api-starwars-local-impl`.
* `fuzzywuzzy`: [La librairie de Fuzzy Search](https://github.com/xdrop/fuzzywuzzy) utilisée par `api-starwars-local-impl`.
* `diffutils`: Le module nécessaire à `fuzzywuzzy` et regroupant différentes méthodes utiles au calcul de la distance de levenshtein.

Les intéractions entre ces modules peuvent se représenter ainsi:

![Dependency Grapg](./images/dependency-graph.png)
_représentation des dépendances_

### Gestion des dépendances

En tant que Sith, l'ensemble du projet est géré avec [Maven](https://maven.apache.org/).
Vous n'avez pas besoin d'installer maven, vous pouvez directement utilser le script `mvnw` (ou `mvnw.bat`) à la racine du projet.

La gestion des modules au moment de la compilation et d'exécution est géré automatiquement par maven (détecte la présence du fichier `module-info`)

> La version finale de l'application est déployée et disponible [ici](https://devfest-nantes-jigsaw.cleverapps.io).
> Si vous le désirez vous pouvez aussi utiliser l'image docker correspondante.

```sh
docker run -ti -p8090:8080 louiznk/sw-devfest:11-distroless
```

L'application démarrer dans docker est accessible [ici](http://localhost:8090)

## Lancement de l'application avec Java 11

Vous avez le projet maven dans votre IDE configuré avec Java 11 (vous pouvez utiliser votre JAVA_HOME ou sdk use java `version` et pour connaitre les version que vous avez via sdkman `sdk list java`).

Vérifier que votre projet s'installe correctement.

```sh
./mvnw clean install
```

Lancer ensuite le serveur :

```sh
cd starwars-vertx-http-server
./mvnw exec:java
```

Constatez que l'application fonctionne en ouvrant votre navigateur sur l'URL [http://localhost:8080](http://localhost:8080) et notamment la page [infos](http://localhost:8080/infos).

> Dans la page info, regardez les informations sur les modules (ou non).

## Modularisation de l'application: maitriser le sabre

Vous allez maintenant développer votre habileté en modularisant votre application.
Commencez par modulariser les modules `api-starwars`, `diff-utils` et `fuzzywuzzy`.

Ajouter pour ces modules le fichier `module-info.java` dans les répertoires `src/main/java`.

Pour rappel les dépendances sont présentées dans le schéma _représentation des dépendances_

N'hésitez à vous appuyer sur vos [TIPS](./TIPS.md) en cas de problème(s)!

Vérfiez que tout compile encore en lançant les tests depuis la racine du projet.

```sh
./mvnw clean test
```

Les tests unitaires doivent aussi passer depuis votre IDE.

## Modularisation du reste de l'application: maitriser le double sabre

Modularisez à présent le module `api-starwars-local-impl`, attention cependant en tant que sith le plugin surefire ne sait pas utiliser jigsaw. Vos tests seront donc lancé avec le classpath classique.

> Attention! IntelliJ n'exécute pas les tests en utilisant les modules (tout comme maven-surefire).

## Modularisation de l'application: maitriser la télékinesie

Modularisez à présent le serveur HTTP `starwars-vertx-http-server` qui, comme précédemment, contient des tests qui doivent fonctionner pour achever votre mission.

Ce module doit:

* permettre d'exposer les ressources statiques (fichier js, html, css, ...) de l'application web.
* utiliser l'implémentation de `org.zenika.handson.jigsaw.api.CharactersApi` (qui est fournit par le module `api-startwars-local-impl`).

Lancez le serveur web qui doit maintenant fonctionner en utilisant les modules.

Vous croyez avoir réussit ? Non, le côté obscure choisit la facilité mais votre maitre vous remez en place jeune apprenti : 
Vous avez certe créer des modules mais vous ne les avez pas executé en tant que module, vous êtes rester dans la voix du classpath. Pour aller plus loin vous devez executer votre application en tant que module jigsaw.

```log
WARNING: An illegal reflective access operation has occurred
WARNING: Illegal reflective access by io.netty.util.internal.ReflectionUtil ...
WARNING: Please consider reporting this to the maintainers of io.netty.util.internal.ReflectionUtil
WARNING: Use --illegal-access=warn to enable warnings of further illegal reflective access operations
WARNING: All illegal access operations will be denied in a future release
```


![Module Name Null](./images/module_name_null.png)
_application lancé sans utiliser Jigsaw_

## Modularisation de l'application: maitriser la foudre

Faite en sorte que votre application démarre avec Jigsaw, pour cela modifier le fichier `./starwars-vertx-http-server/pom.xml`

Remplacez la configuration du plugin `exec-maven-plugin` ainsi. Remplacez `$$YOUR_MODULE_NAME$$` par le nom de votre module et `$$PATH_TO_YOUR_JAVA$$` par le chemin de votre executable java 11.

```xml
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>exec-maven-plugin</artifactId>
                <version>1.6.0</version>
                <configuration>
                    <executable>$$PATH_TO_YOUR_JAVA_EXE$$</executable>
                    <arguments>
                        <argument>--module-path</argument>
                        <modulepath/>
                        <argument>--module</argument>
                        <argument>$$YOUR_MODULE_NAME$$/org.zenika.handson.jigsaw.http.Application</argument>
                    </arguments>
                </configuration>
            </plugin>
```

Puis à la racine du projet

```sh
./mvnw install
cd starwars-vertx-http-server
./mvnw exec:exec
```

Vous devriez avoir l'erreur suivante :

```error
Exception in thread "main" java.util.ServiceConfigurationError: org.zenika.handson.jigsaw.api.CharactersApi: module starwars.http.server does not declare `uses`
	at java.base/java.util.ServiceLoader.fail(ServiceLoader.java:588)
	at java.base/java.util.ServiceLoader.checkCaller(ServiceLoader.java:574)
	at java.base/java.util.ServiceLoader.<init>(ServiceLoader.java:503)
	at java.base/java.util.ServiceLoader.load(ServiceLoader.java:1691)
	at starwars.http.server/org.zenika.handson.jigsaw.http.Application.<clinit>(Application.java:47)
```

Il va falloir maintenant montrer la vraie maitrise de la force. Pour cela

* indiquez que vous **utilisez** une implémentation de l'API (`api-starwars`)
* qui est **fourni** par l'implementation (`api-starwars-local-impl`)
* vous devez aussi **ouvrir** les ressources images fournies par  (`api-starwars-local-impl`) pour quelles soient accessible aux autres modules
* et enfin rendre disponible (ouvrir) **toutes** les ressources web exposées par Vert.x (dans `starwars-vertx-http-server`)

N'oubliez que les [archives de votre droïde](./TIPS.md) sont d'une aide précieuses.

Pourquoi doit-on ouvrir les ressources que l'on partager ? car par défaut ces resources sont "protégées".

> Il y a notamment quelques précisions dans la javadoc suivante.

```
https://docs.oracle.com/javase/9/docs/api/java/lang/Module.html#getResourceAsStream-java.lang.String-

...
A resource in a named module may be encapsulated so that it cannot be located by code in other modules. Whether a resource can be located or not is determined as follows:

 * If the resource name ends with ".class" then it is not encapsulated.
 * A package name is derived from the resource name. If the package name is a package in the module then the resource can only be located by the caller of this method when the package is open to at least the caller's module. If the resource is not in a package in the module then the resource is not encapsulated.
...
```

**Bravo vous avez réussi à modulariser votre première application en utilisant les modules Java!**

Malheureusement, vous réaliser que votre maître **Darth Maven** ne vous a caché des choses! A cause de Surefire, vos tests sont toujours pas exécutés en mode classpath !!!
La maîtrise de Jigsaw par maven ne sera jamais complète!

> Pour en savoir plus, rendez vous [à l'épisode suivant](./EPISODE_4.md).