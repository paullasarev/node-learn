REM sequelize model:generate --name User --attributes name:string,login:string,email:string,password:string
REM sequelize migration:generate
REM sequelize db:drop
sequelize db:create
sequelize db:migrate
REM sequelize seed:generate
sequelize db:seed:all
REM sequelize db:seed:undo:all
