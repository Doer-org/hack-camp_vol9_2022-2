FROM golang:1.17
ENV TZ=Asia/Tokyo

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64
ENV ROOTPATH=/go/app

WORKDIR /go/src/github.com/Doer-org/hack-camp_vol9_2022-2

# RUN go install github.com/cosmtrek/air@v1.40.0
COPY go.mod go.sum  ./
RUN go mod download

EXPOSE 80
# CMD ["air", "-c", ".air.toml"]
