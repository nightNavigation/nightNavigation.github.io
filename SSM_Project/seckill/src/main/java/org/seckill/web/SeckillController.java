package org.seckill.web;

import org.seckill.dto.Exposer;
import org.seckill.dto.SeckillExecution;
import org.seckill.dto.SeckillResult;
import org.seckill.entity.SeckillTab;
import org.seckill.enums.SeckillStatEnum;
import org.seckill.exception.RepeatKillException;
import org.seckill.exception.SeckillCloseException;
import org.seckill.service.SeckillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Date;
import java.util.List;


// 将当前controller放入 Spring 容器中
@Controller
@RequestMapping("/seckill")  // 代表模块 ——@RequestMapping value参数为资源 url： /模块 /资源 /{id} /细分
public class SeckillController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired  // 对类成员变量、方法及构造函数进行标注，完成自动装配工作
    private SeckillService seckillService;

    // 不满足该 RequestMethod.GET 的请求全部驳回
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String list(Model model) {  // Model 用以存放数据
        // 获取列表页
        List<SeckillTab> list = seckillService.getSeckillList();
        // model 用以存放数据，addAttribute() 用以在model中添加标识和数据
        model.addAttribute("list", list);

        // list.jsp + model = ModelAndView
        return "list";  // 简写：/WEB-INF/jsp/"list".jsp
    }

    @RequestMapping(value = "/{seckillId}/detail", method = RequestMethod.GET)
    public String detail(@PathVariable("seckillId") Long seckillId, Model model) {
        if (seckillId == null) {
            // redirect:  请求重定向 /seckill -模块 /list -二级请求，重定向到list.jsp
            return "redirect:/seckill/list";
        }
        SeckillTab seckillTab = seckillService.getSeckillById(seckillId);
        if (seckillTab == null) {
            // 请求转发
            return "forward:/seckill/list";
        }
        model.addAttribute("seckillTab", seckillTab);

        return "detail";
    }

    // ajax json
    @RequestMapping(value = "/{seckillId}/exposer",
            method = RequestMethod.POST,
            produces = {"application/json;charset=UTF-8"})  // 告诉浏览器 content type：指明json ;指定传输 charset ，防止出现乱码
    @ResponseBody  // 注解 表示返回json 类型
    public SeckillResult<Exposer> exposer(@PathVariable("seckillId") Long seckillId) {
        SeckillResult<Exposer> result;
        try {
            Exposer exposer = seckillService.exportSeckillUrl((seckillId));
            result = new SeckillResult<Exposer>(true, exposer);
        } catch (Exception e) {
            logger.error(e.getMessage());
            result = new SeckillResult<Exposer>(false, e.getMessage());
        }
        return result;
    }

    @RequestMapping(value = "/{seckillId}/{md5}/execution",
            method = RequestMethod.POST,
            produces = {"applilcation/json;charset=UTF-8"})
    @ResponseBody  // 注解 表示返回json 类型
    public SeckillResult<SeckillExecution> execute(@PathVariable("seckillId") Long seckillId,
                                                   @PathVariable("md5") String md5,
                                                   @CookieValue(value = "killPhone", required = false) Long phone) {
        // CookieValue 当value值不存在时，系统会直接报错，因此使用 required= false 表请求并非必须

        if (phone == null) {
            return new SeckillResult<SeckillExecution>(false, "未注册");
        }
        SeckillExecution execution = null;
        try {
            execution = seckillService.executeSeckill(seckillId, phone, md5);
            return new SeckillResult<SeckillExecution>(true, execution);
        } catch (RepeatKillException er) {
            execution = new SeckillExecution(seckillId, SeckillStatEnum.REPEAT_KILL);
            return new SeckillResult<SeckillExecution>(false, execution);
        } catch (SeckillCloseException es) {
            execution = new SeckillExecution(seckillId, SeckillStatEnum.END);
            return new SeckillResult<SeckillExecution>(false, execution);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            execution = new SeckillExecution(seckillId, SeckillStatEnum.INNER_ERROR);
            return new SeckillResult<SeckillExecution>(false, execution);
        }
    }

    @RequestMapping(value = "/time/now", method = RequestMethod.GET)
    @ResponseBody
    public SeckillResult<Long> time() {
        Date now = new Date();
        return new SeckillResult(true, now.getTime());
    }
}
