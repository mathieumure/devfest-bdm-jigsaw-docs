# Episode II - Le guerre du Hello World

![Hello Clone](./images/hello_clone.png)

Pendant votre trajet en Hyper-espace, vous décidez de pratiquer votre manipulation de la force.

## Révision des bases

Pour commencer votre initiation, vous allez faire un bon vieux Hello Devfest...mais en lançant les étapes de compilation et d'exécution à la main pour mieux comprendre l'utilisation de Jigsaw.

Pour cela, créer une nouvelle classe `Application.java` dans le package `org.devfest.handson.jigsaw` qui contiendra votre `main`.

```java
package org.devfest.handson.jigsaw;

import java.util.logging.Logger;

public class Application {
    private static final Logger LOGGER = Logger.getLogger(Application.class.getName());

    public static void main(String[] args) {
        LOGGER.info("Hello Devfest");
    }
}
```

Vous allez maintenant lancer la compilation _"à l'ancienne"_ de cette classe.

Dans votre terminal, exécuter la commande suivante.

```sh
javac -d target src/org/devfest/handson/jigsaw/Application.java
```

Puis démarrer la classe générée.

```sh
java -classpath target/ org.devfest.handson.jigsaw.Application
```

Vous devriez voir s'afficher votre bon vieux `Hello Devfest`!

## Transformation en Jigsaw

Relancer maintenant une compilation, mais cette fois-ci en utilisant les modules.

```sh
javac -d target \
  --module-path src \
  src/module-info.java src/org/devfest/handson/jigsaw/Application.java
```

Vous devriez obtenir l'erreur suivante.

```error
file not found: src/module-info.java
```

Normal car vous n'avez pas encore défini votre module !

Ajouter un fichier `module-info.java` dans `src` afin de définir votre module que vous nommerez `org.devfest.handson.jigsaw`.

```java
module org.devfest.handson.jigsaw {
}
```

Relancer la compilation qui devrait encore une fois échouer.

```error
package java.util.logging is declared in module java.logging, but module org.devfest.handson.jigsaw does not read it
```

Cette fois-ci, pour pouvoir utiliser les classes du package `java.util.logging`, il faut ajouter une dépendance au module `java.logging` dans votre définition du module.

Ajoutez-la dans votre `module-info.java` avec le mot clé `requires` et enfin relancez votre compilation qui doit maintenant avoir créé un joli `module-info.class` dans le dossier `target`.


Exemple :
```java
module org.devfest.handson.jigsaw {
    requires jai.laforce;
}
```

**Bravo à vous! Compilé votre premier module Java, vous avez.**

Lancer à présent votre application en utilisant le chargement par module.

```sh
java --module-path target --module org.devfest.handson.jigsaw/org.devfest.handson.jigsaw.Application
```

**Bravo à vous! Votre premier module Java, exécuté, vous avez.**

> Vous commencez à ressentir le pouvoir des midi-chloriens présent dans toutes choses de l'univers... Rendez-vous dans le [prochain épisode](./EPISODE_3.md) pour continuer votre initiation...
