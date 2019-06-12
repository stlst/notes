docker命令：
* build当前项目并生成名为v4的镜像：`docker build -t v4 .`
* 展示当前有的镜像：`docker images`
* 在名为v4c的container中run v4镜像，外部端口是80，指向转发内部端口是8080: `docker run --name v4c -p 80:8080 v4`
* 进入v4c容器的命令行界面：`docker exec -it v4c sh`, `DEPLOYMENTS_DIR`一般是`/opt/public/`


Dockerfile:
```dockerfile
# 拉取基础镜像
FROM csbase.registry.******.cn/paas/****-nginx-1.9.7:v1.1.0
USER 1001
COPY ./build/ ${DEPLOYMENTS_DIR}/
EXPOSE 8080
CMD ["/opt/nginx/sbin/nginx","-p","/opt/nginx","-c","/opt/nginx/conf/nginx.conf"]
```


解释：
1. FROM 指定基础镜像
2. COPY：表示将上下文中的`./build/`复制到`/opt/public/`目录。注意当复制多个文件时，目的文件夹要添加/，如`/opt/app-root/src/`，而不是`/opt/app-root/src`
3. ENV 指定环境变量
4. RUN：执行指定的指令
5. EXPOSE: 暴露容器端口为8080
6. ENTRYPOINT：配置容器启动后执行的命令


* 若用户想在多个环境中使用不同的`nginx.conf`文件或内容，可以使用`configmap`挂载存储卷方式替换应用镜像中的`nginx.conf`配置文件。