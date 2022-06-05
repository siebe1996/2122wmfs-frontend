# Frontend gotcha project
Final project web-mobile full-stack
## Links

* [Course slides wmfs-vue](https://intern.ikdoeict.be/apps/leercentrum/courses/wmfs-vue-course-materials/index.html)
* [VUE Documentation (option api)](https://vuejs.org/guide/introduction.html)
* [VUEX Documentation](https://vuex.vuejs.org/)
* [AXIOS Documentation](https://axios-http.com/docs/intro)
* [Odisee Hoge school](https://odisee.be)

## How to pull it from git

1. Create a new completely! empty project on gitlab.com/ikdoeict, for example my-project
2. Execute following commands on your system (pay attention !)
3. Best installed on ubuntu
```shell
mkdir my-project
cd my-project
git init
git pull https://gitlab.com/siebe.vandevoorde/2122wmfs-frontend
```

This projectis made in vue 3 option api and vuex

## Project Setup

```sh
npm install
npm install vuex@next --save
npm install axios --save
npm install --save-dev sass
```

### Compile and Hot-Reload for Development
#### this must run on port 3000 to communicate with the backend that belongs to this project

```sh
npm run dev
```

### Compile and Minify for Production
#### not necessary

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)
#### not necessary

```sh
npm run lint
```
