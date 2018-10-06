# Episode II - Le guerre du Hello World

![Hello Clone](./images/hello_clone.png)

Pendant votre trajet en Hyper-espace, vous décidez de pratiquer votre manipulation de la force.

## Révision des bases

Pour commencer en douceur, vous allez faire un bon vieux Hello Devfest...mais en lançant les étapes de compilation et d'exécution à la main pour mieux comprendre l'utilisation de Jigsaw.

Pour cela, créez une nouvelle classe `Application.java` dans le package `org.devfest.handson.jigsaw` qui contiendra votre `main`.

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

Dans votre terminal, exécuter la commander suivante.

```
javac -d target src/org/devfest/handson/jigsaw/Application.java
```

Puis lancer l'exécution du bytecode généré.

```
java -classpath target/ org.devfest.handson.jigsaw.Application
```

Vous devriez voir s'afficher votre bon vieux `Hello Devfest`!

## Transformation en Jigsaw

Relancez maintenant une compilation, mais cette fois-ci en utilisant les modules.

```
javac -d target \
  --module-path src \
  src/module-info.java src/org/devfest/handson/jigsaw/Application.java
```

Vous devriez obtenir l'erreur suivante.

```
file not found: src/module-info.java
```

Normal car vous n'avez pas encore défini votre module !

Ajoutez un fichier `module-info.java` dans `src` afin de définir votre module que vous nommerez `org.devfest.handson.jigsaw`.

```java
module org.devfest.handson.jigsaw {
}
```

Relancez la compilation qui devrait encore une fois échouer.

```
package java.util.logging is declared in module java.logging, but module org.devfest.handson.jigsaw does not read it
```

Cette fois-ci, vous avez oublié de définir la dépendance vers `java.util.logging` dans votre définition du module.
Ajoutez-la dans votre `module-info.java` et enfin relancez votre compilation qui doit maintenant avoir créé un joli `module-info.class` dans le dossier target.

**Bravo à vous! compilé votre premier module Java vous avez.**

Lancez à présent votre application en utilisant le chargement par module.

```
java --module-path target --module org.devfest.handson.jigsaw/org.devfest.handson.jigsaw.Application
```

**Bravo à vous! votre premier module Java exécuté vous avez.**

> Vous êtes maintenant prêt à affonter le monde réel. Rendez-vous dans le [prochain chapitre](./EPISODE_3.md) pour continuer votre aventure...
