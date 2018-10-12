# Episode IV - Gradle, un Nouvel Espoir

![Master Gradle](./images/master_gradle.jpg)

Vous vous rendez compte de la surpercherie de votre maître et suite à un combat épique contre lui, vous êtes sauvé par **Master Gradle**, le Jedi légendaire.

Vous le suivez et devenez son Padawan pour sortir du côté obscure de la Force.

```sh
cd hands-on-jigsaw-devfest/66-jedi
```

## Suivre le chemin des Jedi: configurer Gradle

Contrairement à Maven, avec Gradle, vous devez configurer les étapes de build et de run pour intégrer les modules. Bien que le côté obscure possède de nombreuses tentations qui permettent d'abstraire cette configuration (comme le plugin `chainsaw`), ceux-ci sont loin d'être stables.

Ajoutez dans l'ensemble des définitions de build gradle (fichiers `$$repertoire_du_module$$\build.gradle`) des modules une `ExtraPropertyExtension` qui aura le nom de votre module (voir exemple). Cette propriété sera utilisée lors les builds Gradle pour identifier votre module.

```groovy
ext.moduleName = "my.module"
```

Une fois que cela est fait, il faut modifier le fichier `build.gradle` racine pour configurer Gradle avec nos modules.

* Ajoutez un hook sur la tâche `compileJava` pour ajouter dans l'argument `--module-path` les valeurs retournées par `classpath.asPath`.
* Ajoutez un hook sur la tâche `compileTestJava` pour configurer `javac` avec les arguments `--module-path`, `--add-module`, `--add-reads`, `--patch-module`.
* Ajoutez un hook sur la tâche `test` pour configurer `javac` avec les arguments `--module-path`, `--add-module`, `--add-reads`, `--patch-module`.

> `classpath.asPath` retourne le classpath tel que calculé en fonction des dépendences définies dans le projet gradle.

Encore une fois n'hésitez à vous appuyer sur les [archives de votre droïde](./TIPS.md) en cas de problème(s)!

**starwars-vertx-http-server/build.gradle**

* Ajoutez un hook sur la tâche `run` pour ajouter les arguments jvm `--modulePath` et `--module`.
* Ajoutez un hook sur la tâche `startScripts` avec le contenu suivant.

```groovy
import java.util.regex.Matcher // Matcher is use for replacing args in batchs files
...

startScripts {
    inputs.property("moduleName", moduleName)
    doFirst {
        classpath = files()
        defaultJvmOpts = [
                '--module-path', 'APP_HOME_LIBS', // Multi plateform replace in doLast
                '-Dport=8080', '-Ddev=false',
                '--module', mainClassName
        ]
    }
    doLast{
        def bashFile = new File(outputDir, applicationName)
        String bashContent = bashFile.text
        bashFile.text = bashContent.replaceFirst('APP_HOME_LIBS', Matcher.quoteReplacement('$APP_HOME/lib'))

        def batFile = new File(outputDir, applicationName + ".bat")
        String batContent = batFile.text
        batFile.text = batContent.replaceFirst('APP_HOME_LIBS', Matcher.quoteReplacement('%APP_HOME%\\lib'))
    }
}
```

Buildez et lancez votre serveur, qui doit fonctionner comme avant!

```sh
./gradlew run
```

Si vous vous connectez à l'application et regardez la page informations, vous devriez avoir cela :

![Module Name Null](./images/module_name_completed.png)
_application lancé avec utiliser Jigsaw_

> Bravo vous avez réussi à utiliser la force sans le côté obscure. Il est maintenant temps pour vous de devenir un maître Jedi! Si la force est avec vous, rendez-vous dans [l'épisode suivant](./EPISODE_5.md).
