package cmd

import "context"

func Execute() {
	var err, optserr error
	// 创建一个可取消的上下文，用于控制整个程序的生命周期
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// 读取配置文件

	//解析命令行参数

}
