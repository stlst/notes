[Ref](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.15/#-strong-api-overview-strong-)

- 基本类型

  - pod
  - service
  - deployment
  - configmap
  - job

- minikube 命令

  - show service list: `minikube service list`
  - minikube start: `minikube start --vm-driver=virtualbox --cpus=4 --memory=4096mb --image-mirror-country cn --iso-url=https://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/iso/minikube-v1.5.0.iso --registry-mirror=https://hub-mirror.c.163.com`
  - minikube terminal: `minikube ssh`

- kubectl 命令

  - pod

    - create a pod: `kubectl create -f pod/pod.yaml`
    - apply/update \*.yaml configs: `kubectl apply -f pod/pod.yaml`
    - edit a pod called pod-demo(will effect immediately): `kubectl edit pods pod-demo`
    - show pods: `kubectl get pods`
    - show descriptions of a pod called pod-demo: `kubectl describe pods pod-demo` or `kubectl describe pods pod-demo --watch`
    - enter exec terminal: `kubectl exec -it pod-demo bash`
    - delete a pod called pod-demo: `kubectl delete pods pod-demo`

  - service

    - delete all services : `kubectl delete services --all`
    - show deploys: `kubectl get deploys`
    - show details of deploy-demo-v2: `kubectl get deploy deploy-demo-v2`
    - delete all deployments: `kubectl delete deployments --all`

  - others

    - get all through kubectl: `kubectl get all`

  - porxy

    - set up proxy for kubectl(so that it can be accessed through browsers): `kubectl proxy`
    - access url: `http://localhost:8001/api/v1/namespaces/default/services/service-cluster-ip/proxy`
      - namespace name: default
      - service name: service-cluster-ip

  - You can also see kube-dns with the following link:
    (the name in Service-spec-ports should be recorded here if you want to use this attribute.)
    - access url: `http://localhost:8001/api/v1/namespaces/kube-system/services/kube-dns`
