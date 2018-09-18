(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{170:function(e,t,a){"use strict";a.r(t);var s=a(0),r=Object(s.a)({},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[e._m(0),e._v(" "),e._m(1),e._v(" "),e._m(2),e._v(" "),e._m(3),e._m(4),e._v(" "),e._m(5),e._m(6),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),a("p",[e._v("Encore une fois n'hésitez à vous appuyer sur vos "),a("router-link",{attrs:{to:"./TIPS.html"}},[e._v("TIPS")]),e._v(" en cas de problème(s)!")],1),e._v(" "),e._m(9),e._v(" "),e._m(10),e._v(" "),e._m(11),a("p",[e._v("Buildez et lancez votre serveur, qui doit fonctionner comme avant!")]),e._v(" "),a("blockquote",[a("p",[e._v("Bravo vous avez réussi à configurer Gradle sans chainsaw et vous maitrisez maintenant pleinement vos pouvoirs! Si la force est avec vous, rendez-vous sur "),a("router-link",{attrs:{to:"./CHAPTER_5.html"}},[e._v("l'exercice suivant")]),e._v(".")],1)])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h1",{attrs:{id:"chapter-4-you-are-more-than-just-a-suit"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#chapter-4-you-are-more-than-just-a-suit","aria-hidden":"true"}},[this._v("#")]),this._v(" Chapter 4 - You are more than just a suit")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Ouch...suite à votre combat du chapitre 3, votre super combinaison "),t("code",[this._v("chainsaw")]),this._v(" vient de tomber. Vous devez maintenant configurer Gradle sans lui.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Supprimez le plugin chainsaw de l'ensemble des fichiers "),t("code",[this._v("build.gradle")]),this._v(" et les hack junit associés.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("git checkout j9-vertx-no-chainsaw\n")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Ajoutez dans l'ensemble des ces fichiers une "),t("code",[this._v("ExtraPropertyExtension")]),this._v(" qui aura le nom de votre module (voir exemple).")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v('ext.moduleName = "my.module"\n')])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("build.gradle")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("Ajoutez un hook sur la tâche "),a("code",[e._v("compileJava")]),e._v(" pour ajouter dans l'argument "),a("code",[e._v("--module-path")]),e._v(" les valeurs retournées par "),a("code",[e._v("classpath.asPath")]),e._v(".")]),e._v(" "),a("li",[e._v("Ajoutez un hook sur la tâche "),a("code",[e._v("compileTestJava")]),e._v(" pour configurer "),a("code",[e._v("javac")]),e._v(" avec les arguments "),a("code",[e._v("--module-path")]),e._v(", "),a("code",[e._v("--add-module")]),e._v(", "),a("code",[e._v("--add-reads")]),e._v(", "),a("code",[e._v("--patch-module")]),e._v(".")]),e._v(" "),a("li",[e._v("Ajoutez un hook sur la tâche "),a("code",[e._v("test")]),e._v(" pour configurer "),a("code",[e._v("javac")]),e._v(" avec les arguments "),a("code",[e._v("--module-path")]),e._v(", "),a("code",[e._v("--add-module")]),e._v(", "),a("code",[e._v("--add-reads")]),e._v(", "),a("code",[e._v("--patch-module")]),e._v(".")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("blockquote",[t("p",[t("code",[this._v("classpath.asPath")]),this._v(" retourne le classpath tel que calculé en fonction des dépendences définies dans le projet gradle.")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("strong",[this._v("marvel-http-server/build.gradle")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("Ajoutez un hook sur la tâche "),a("code",[e._v("run")]),e._v(" pour ajouter les arguments jvm "),a("code",[e._v("--modulePath")]),e._v(" et "),a("code",[e._v("--module")]),e._v(".\nAjoutez un hook sur la tâche "),a("code",[e._v("startScripts")]),e._v(" avec le contenu suivant.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[this._v("import java.util.regex.Matcher // Matcher is use for replacing args in batchs files\n...\n\nstartScripts {\n    inputs.property(\"moduleName\", moduleName)\n    doFirst {\n        classpath = files()\n        defaultJvmOpts = [\n                '--module-path', 'APP_HOME_LIBS', // Multi plateform replace in doLast\n                '-Dport=8080', '-Ddev=false',\n                '--module', mainClassName\n        ]\n    }\n    doLast{\n        def bashFile = new File(outputDir, applicationName)\n        String bashContent = bashFile.text\n        bashFile.text = bashContent.replaceFirst('APP_HOME_LIBS', Matcher.quoteReplacement('$APP_HOME/lib'))\n\n        def batFile = new File(outputDir, applicationName + \".bat\")\n        String batContent = batFile.text\n        batFile.text = batContent.replaceFirst('APP_HOME_LIBS', Matcher.quoteReplacement('%APP_HOME%\\\\lib'))\n    }\n}\n")])])])}],!1,null,null,null);r.options.__file="CHAPTER_4.md";t.default=r.exports}}]);