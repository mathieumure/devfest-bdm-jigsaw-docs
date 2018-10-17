# Episode IV - Gradle, un Nouvel Espoir

![Master Gradle](./images/master_gradle.jpg)

Vous vous rendez compte de la supercherie de votre maître et suite à un combat épique contre lui, vous êtes sauvé par **Master Gradle**, le Jedi légendaire.

Vous le suivez et devenez son Padawan pour sortir du côté obscure de la Force.

```sh
cd hands-on-jigsaw-devfest/66-jedi
```

## Suivre le chemin des Jedi: configurer Gradle

Contrairement à Maven, avec Gradle, vous devez configurer les étapes de build et de run pour intégrer les modules. 

**C3P0_H3LP**
> Bien qu'il existe des plugins Gradle qui permettent d'abstraire cette configuration (comme le plugin `chainsaw`), ceux-ci sont loin d'être stables et sont teintés du côté obscure.

Ajouter dans l'ensemble des définitions de build gradle (fichiers `$$repertoire_du_module$$\build.gradle`) une `ExtraPropertyExtension` qui aura le nom de votre module (voir exemple). Cette propriété sera utilisée lors des builds Gradle pour identifier votre module.

```groovy
ext.moduleName = "<my.module>"
```

Une fois que cela est fait, il faut modifier le fichier `build.gradle` racine pour configurer Gradle.

* Redéfinir la tâche `compileJava` pour ajouter dans l'argument `--module-path` les valeurs retournées par `classpath.asPath`.
* Redéfinir la tâche `compileTestJava` pour configurer `javac` avec les arguments `--module-path`, `--add-module`, `--add-reads`, `--patch-module`.
* Redéfinir la tâche `test` pour configurer `javac` avec les arguments `--module-path`, `--add-module`, `--add-reads`, `--patch-module`.

**C3P0_H3LP**
> `classpath.asPath` retourne le classpath tel que calculé en fonction des dépendances définies dans le projet gradle.

Encore une fois n'hésitez à vous appuyer sur les [archives de votre droïde](./C3P0_HELP.md) en cas de problème(s)!

**starwars-vertx-http-server/build.gradle**

* Redéfinir sur la tâche `run` pour ajouter les arguments jvm `--modulePath` et `--module`.
* Redéfinir sur la tâche `startScripts` avec le contenu suivant.

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

Builder et lancer votre serveur, qui doit fonctionner comme avant!

```sh
./gradlew test run
```

Si vous vous connectez à l'application et regardez la page informations, vous devriez avoir cela :

![Module Name Null](./images/module_name_completed.png)
_application lancée avec Jigsaw_

> Bravo vous avez réussi à utiliser la force sans le côté obscure. Il est maintenant temps pour vous de devenir un maître Jedi! Si la force est avec vous, rendez-vous dans [l'épisode suivant](./EPISODE_5.md).
