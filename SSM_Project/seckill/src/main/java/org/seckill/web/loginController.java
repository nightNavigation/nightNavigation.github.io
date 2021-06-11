package org.seckill.web;

import org.seckill.entity.SeckillTab;
import org.seckill.service.SeckillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/")
public class loginController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired  // 对类成员变量、方法及构造函数进行标注，完成自动装配工作
    private SeckillService seckillService;

    // 不满足该 RequestMethod.GET 的请求全部驳回
    @RequestMapping(value = "/seckill", method = RequestMethod.GET)
    public String list(Model model) {  // Model 用以存放数据
        // 获取列表页
        List<SeckillTab> list = seckillService.getSeckillList();
        // model 用以存放数据，addAttribute() 用以在model中添加标识和数据
        model.addAttribute("list", list);

        // list.jsp + model = ModelAndView
        return "list";  // 简写：/WEB-INF/jsp/"list".jsp
    }
}
