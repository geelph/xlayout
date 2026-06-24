# Go命令行工具标准项目结构

根据 [golang-standards/project-layout](https://github.com/golang-standards/project-layout) 的建议，以下是一个标准的Go命令行工具项目结构。这个结构适用于中大型项目，可以根据实际需要裁剪。

## 项目目录结构

```
my-cli-tool/
├── cmd/
│   └── my-cli/
│       └── main.go          # 主应用程序入口
├── internal/
│   ├── app/                 # 应用核心逻辑
│   │   └── app.go
│   └── pkg/                 # 内部共享包
│       └── config/
│           └── config.go
├── pkg/                     # (可选) 可导出的公共库
├── scripts/                 # 构建和安装脚本
│   ├── build.sh
│   └── install.sh
├── configs/                 # 配置文件模板
│   └── config.yaml
├── build/                   # 构建相关文件
│   ├── ci/                  # CI配置
│   └── package/             # 打包配置
├── deployments/             # 部署配置
├── test/                    # 额外的测试应用和数据
│   └── testdata/
├── docs/                    # 项目文档
├── examples/                # 使用示例
├── tools/                   # 项目支持工具
├── vendor/                  # 依赖包 (如果使用vendor模式)
├── .gitignore
├── .editorconfig
├── go.mod
├── go.sum
├── Makefile                 # 构建和管理命令
└── README.md
```

## 关键目录说明

### 1. `/cmd`
- 主应用程序目录
- 每个可执行文件应有自己的子目录
- 应保持精简，主要负责解析命令行参数并调用`internal`或`pkg`中的功能
- 示例文件 `cmd/my-cli/main.go`:
```go
package main

import (
    "log"
    "os"
    
    "github.com/yourusername/my-cli-tool/internal/app"
)

func main() {
    // 初始化配置
    config, err := app.LoadConfig()
    if err != nil {
        log.Fatalf("无法加载配置: %v", err)
    }
    
    // 创建应用实例
    cliApp, err := app.New(config)
    if err != nil {
        log.Fatalf("无法初始化应用: %v", err)
    }
    
    // 执行命令
    if err := cliApp.Run(os.Args); err != nil {
        log.Fatalf("应用执行失败: %v", err)
    }
}
```

### 2. `/internal`
- 私有应用和库代码，不允许外部项目导入
- 可分为`app`(应用核心)和`pkg`(内部共享包)两个子目录
- Go编译器会强制执行此目录的访问限制

### 3. `/pkg` (可选)
- 用于存放可被外部项目使用的公共库
- 命令行工具如果不需要提供可重用库，可以省略此目录

### 4. 其他重要目录
- `/scripts`: 放置构建、安装等脚本
- `/configs`: 配置文件模板或默认配置
- `/build`: 打包和CI相关配置
- `/test`: 额外的测试应用和测试数据

## 初始化项目

1. 创建目录结构:
```bash
mkdir -p my-cli-tool/{cmd/my-cli,internal/app,internal/pkg/config,scripts,configs,build/{ci,package},test/testdata,docs,examples}
cd my-cli-tool
```

2. 初始化Go模块:
```bash
go mod init github.com/yourusername/my-cli-tool
```

3. 创建基础文件:

`.gitignore`:
```
# Binaries
*.exe
*.exe~
*.dll
*.so
*.dylib
*.test
*.out

# Go
/bin/
/vendor/
/pkg/

# Config
*.env
```

`Makefile`:
```makefile
BINARY_NAME=my-cli
VERSION=0.1.0
BUILD_TIME=$(shell date -u '+%Y-%m-%d_%H:%M:%S')
VERSION_FLAGS=-ldflags="-w -s -X main.version=$(VERSION) -X main.buildTime=$(BUILD_TIME)"

.PHONY: build
build:
	go build $(VERSION_FLAGS) -o bin/$(BINARY_NAME) ./cmd/my-cli

.PHONY: install
install:
	go install $(VERSION_FLAGS) ./cmd/my-cli

.PHONY: test
test:
	go test -v ./...

.PHONY: clean
clean:
	rm -rf bin/
	rm -rf vendor/
```

## 开发流程

1. 在`internal/app`中实现核心功能
2. 在`cmd/my-cli/main.go`中构建命令行接口
3. 使用`make build`编译项目
4. 使用`make install`安装到`$GOPATH/bin`
5. 添加测试到相应包中
6. 编写文档和示例

## 部署与分发

1. 使用`go build`为不同平台构建二进制文件
2. 考虑使用Goreleaser自动化发布流程
3. 将配置文件放在`/configs`中作为模板
4. 为常见平台提供安装脚本在`/scripts`目录中

## 注意事项

- 对于小型CLI工具，可以简化此结构，例如省略`/pkg`目录
- 不要使用`/src`目录，这是Java项目的常见模式，不适合Go项目
- 随着项目增长，可以根据需要扩展此结构
- 使用Go Modules管理依赖，除非有特殊原因需要vendor依赖

这个结构提供了良好的可扩展性，当你的CLI工具变得更加复杂时，它能够很好地组织代码和资源。根据项目规模，你可以选择性地使用这些目录，不必全部采用。