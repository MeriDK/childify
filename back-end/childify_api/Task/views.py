from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import *
from .models import Task
from .models import Status,Category
from Family.models import Family
from Parent.models import Parent
from Child.models import Child
from User.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


class TaskDetail(APIView):

    def get(self, request, *args, **kwargs):
        question = get_object_or_404(Task,pk=kwargs['id'])
        serializer = TaskSerializer(question)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        if (request.data['status'] == 2):
            print("ok")
            print(Child.object.get(user=request.user.user_id))
            child = Child.object.get(user=request.user.user_id)
            request.data['id_child'] = child.id
        serializer = TaskSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            question = serializer.save()
            return Response(TaskSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        question.delete()
        return Response("Task deleted", status=status.HTTP_204_NO_CONTENT)

    def put(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        serializers = TaskSerializer(question, data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class AddPoint(APIView):

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Task, pk=kwargs['id'])
        serializers = TaskSerializer(question,data=request.data,  partial=True)
        if serializers.is_valid():
            user = User.object.get(user_id=serializers.data['id_child'])
            child = Child.object.get(user=user)
            point = child.points
            point += serializers.data['point_task']
            point = {'points':point}
            question = get_object_or_404(Child, pk=child.id)
            point = PointSerializer(question,data=point, partial= True)
            if point.is_valid():
                point.save()
                print(point.data)
                return Response(point.data)
        return Response(serializers.errors)


class TaskCreate(APIView):

    def post(self, request):
        if request.method == "POST":
            serializers = TaskCreateSerializer(data = request.data)
            user = User.object.get(user_id=request.user.user_id)
            if request.user.isParent:
                family = Parent.object.get(user=user)
            else:
                family = Child.object.get(user=user)
            family = Family.object.get(id=family.family.id)
            print(family)
            if serializers.is_valid():

                task= Task.object.create_task(family,1,serializers.data['category'],serializers.data['name_task'],serializers.data['info_task'],serializers.data['point_task'])
                return JsonResponse({"info":"task create"},status = 201)
            return JsonResponse(serializers.data,status = 400)


class ParentTaskStatus(generics.ListCreateAPIView):
    serializer_class = TaskIconSerializer
    queryset = Task.object.all()
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):

        status = self.request.query_params.get('status', None)
        queryset = Task.object.all().filter(status=status)
        child = 0
        if self.request.user.isParent:
            user = Parent.object.filter(user=self.request.user.user_id).first()
        else:
            user = Child.object.filter(user=self.request.user.user_id).first()
            child = user.id
        family = user.family.id
        queryset = queryset.filter(id_family=family)

        if status != '1' and child:
            queryset = queryset.filter(id_child=child)

        return queryset

