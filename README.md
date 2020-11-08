# BugHound

Aplicación movil para la biodiversidad, destinada a la identificacion de insectos y sus caracteristicas relacionadas con la importancia economica y sanitaria de las regiones.

Proyecto desarrollado como trabajo de tesina como enfoque a la utilizacion de interfaces para la biodiversidad.
Taller 5 de la carrera de diseño multimedial de la facultad de artes de la UNLP.

------

Mobile application for biodiversity to identify species and the relations with the economic and health importance in the regions

------

## 1 - Instalacion de NodeJS

### Ubuntu Linux:
```
sudo apt update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

### MacOS:

```
brew node
```

### Windows:
Descargar el instalable desde https://nodejs.org/es/download/


## 2 - Descargar proyecto

### Utilizando Git

```
git clone https://github.com/Bughound/bughound.git
```

Tambien puede ser descargado directamente como un archivo zip clickeando sobre el boton verde que se encuentra a la izquierda.

## 3 - Instalando paquetes

Dentro del directorio del proyecto ejecutar el comando `npm install`

## 4 - Iniciar el servidor de desarrollo

### Capacitor + servidor
`npm run capacitor:serve --android`

Es necesario tener instalado Android Studio, junto al SDK y el ADV(Android Virtual Device) para el desarrollar y compilar la aplicación para android.

## 5 - Compilar

Ejecutar `npm run build` para compilar el codigo de vue, a continuación, ejecutar el comando `npx cap sync` para sincronizar los archivos compilados con el proyecto de Android. Finalmente realizar una compilación de la aplicación desde Android Studio para exportar la APK.
