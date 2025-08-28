# ---- build stage (SDK 9) ----
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /out /p:PublishReadyToRun=true

# ---- runtime stage (AWS Lambda .NET 9) ----
FROM public.ecr.aws/lambda/dotnet:9
WORKDIR /var/task
COPY --from=build /out .

# IMPORTANT: replace GlossaAPI with the assembly name (without .dll)
CMD ["GlossaAPI"]
