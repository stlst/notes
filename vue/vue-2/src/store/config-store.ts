import { defineStore } from "pinia";
interface ICommonConfig {
  /** 运营内部使用，比如标注是哪个月的配置 */
  mark: string;
  /** TODO: 这里的用途是？ */
  actConfig: {
    /** TODO: 作用是什么？活动开始时间 */
    actStartTime: Date;
    /** 活动结束时间 */
    actEndTime: Date;
  };
  /** 印花配置 */
  stampConfig: {
    /** 印花资格id */
    stampId: string;
    /** TODO: 这与前面活动起止时间的区别？印花有效期 */
    stampStartTime: Date;
    /** 印花过期时间 */
    stampEndTime: Date;
    /** 提示条文案（中） */
    tipsText: string;
    /** 提示条文案（英） */
    tipsTextEn: string;
    /** 提示条开始时间 */
    tipsStartTime: Date;
    /** 提示条结束时间 */
    tipsEndTime: Date;
  };
  /** 小黄条配置 */
  noticeConfig: {
    /** 小黄条文案, 中 */
    text: string;
    /** 小黄条文案, 英 */
    textEn: string;
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date;
  };
  /** 阻断弹窗配置 */
  blockDialogConfig: {
    /** 阻断弹窗文案, 中 */
    text: string;
    /** 阻断弹窗文案, 英 */
    textEn: string;
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date;
  };
  /** 底部条款与细则区域配置 */
  tncModuleConfig: {
    /** 「查看优惠券」图标链接 */
    viewCouponIcon: string;
    /** 「查看优惠券」跳转链接 */
    viewCouponLink: string;
    /** 「tnc」图标链接 */
    tncIcon: string;
    /** 「tnc」跳转链接 */
    tncLink: string;
  };
  /** 挂件配置 */
  floatModuleConfig: {
    /** 挂件图片链接，中 */
    floatIconCn: string;
    /** 挂件图片链接，英 */
    floatIconEn: string;
    /** 跳转url */
    jumpLink: string;
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date;
  };
  /** 订阅提醒配置 */
  subscribeModuleConfig: {
    //   TODO: 需要中英？
    //   页面订阅提醒
    // 任务完成时订阅提醒
    // 兑换奖励后订阅提醒
  };
}
interface ITaskConfig {
  /** 运营内部使用，比如标注是哪个月的配置 */
  mark: string;
  taskGroupConfig: Array<{
    /** 是否用abt cgi */
    abtCgiType: "0" | "1";
    // TODO: 待定
    //     /** 任务类型：限时任务，基础任务，新手任务, 专属任务 */
    //     taskType: "limit" | "basic" | "newUser";
    /** 任务组id */
    taskId: string;
    /** 任务生效时间, 未到生效时间则任务为预告状态 */
    // TODO: 是否需要提前三天才变成预告状态？
    // TODO: 这2个配置要放在groupConfig还是itemConfig?
    taskStartTime: Date;
    /** 任务失效时间 */
    taskEndTime: Date;
    blackListConfig?: {
      /** 黑白名单活动id */
      blackListActId?: string;
      /** 黑名单 or 白名单 */
      blackListType?: "0" | "1";
    };
  }>;
  // TODO: 签到任务活动id写到哪里？
  taskItemConfig: Array<{
    /** 备注名称，用于产品内部标记 */
    mark?: string;
    /** 排序 */
    sort: number;
    /** 任务名称（中） */
    taskName: string;
    /** 任务名称（英） */
    taskNameEn: string;
    /** 任务图标 */
    taskIcon: string;
    /** TODO: 用途？ 任务类型 -运营自定义。 */
    // 感觉放这里灵活性强一点
    /** 任务类型：限时任务，基础任务，新手任务, 专属任务 */
    taskType: "limit" | "basic" | "newUser";
    /** 可得印花数 */
    stampCnt: number;
    /** 任务规则（中） */
    taskRule: string;
    /** 任务规则（英） */
    taskRuleEn: string;
    /** TODO: 放哪里？有中英？ 任务攻略提示 */
    taskTips?: string;
    /** 按钮跳转链接 */
    btnLink?: string;
    /** TODO: 待同步。 小程序跳转配置 */
    btnMpConfig?: {
      username?: string;
      path?: string;
    };
  }>;
}
interface ICouponConfig {
  /** 运营内部使用，比如标注是哪个月的配置 */
  mark: string;
  /** 奖池刷新时间，格式如12:00 */
  refreshTime: string;
  /** 券-mojo原数据 */
  originalConpon: Array<{
    groupId: Array<string>;
    /** TODO: 待定义originCoupon的类型。需要JSON.parse */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    couponArray: Array<any>;
  }>;
  /** 券-个性配置 */
  couponItemConfig: Array<{
    /** 券id，外键 */
    couponId: string;
    /** 券名称，英文 */
    couponNameEn: string;
    /** 券使用条件，英文 */
    couponRuleEn: string;
    /** 券排序 */
    sort: number;
    /** 券标签标识 */
    tagKey?: string; // TODO: 支持从tagConfig中关联
    /** 标识下线时间 */
    tagEndTime?: Date; // TODO: 是否需要tagStartTime? 如果这里为空则永远不下架？
    /** 所属tab分类 */
    tabKey: string[]; // TODO: 支持从tabConfig中关联
    /** 样式勾选。TODO: 这里直接根据是否商户展示券来就好了？ */
    couponStyle: string; // 通用样式/展示券样式
    /** 验证状态 */
    status: "online" | "verifying";
  }>;
  /** 分类tab配置。TODO: 感觉要放到另外一个常驻配置中 */
  tabConfig: Array<{
    /** tab的唯一标识 */
    key: string;
    /** tab的排序 */
    sort: number;
    /** tab的名称（中），展示用 */
    name: string;
    /** tab的名称（英），展示用 */
    nameEn: string;
  }>;
  /** 券标签tag配置，TODO: 感觉要放到另外一个常驻配置中  */
  tagConfig: Array<{
    /** tag的唯一标识 */
    key: string;
    /** tag的名称（中），展示用 */
    name: string;
    /** tag的名称（英），展示用 */
    nameEn: string;
  }>;
}
interface IPeriodCtrlConfig {
  /** 配置生效时间 */
  startTime: Date;
  /** 配置结束时间 */
  endTime: Date;
  /** 配置 */
  config: {
    /** TODO: 或者选择config的id或者人为指定的标识？ */
    commonConfig: ICommonConfig;
    couponConfig: ICouponConfig;
    taskConfig: ITaskConfig;
  };
}
export const store = defineStore({
  id: "configStore", // 必填

  state: () => {
    return {} as IPeriodCtrlConfig;
  },

  getters: {}, // 非必要转换别填

  actions: {
    setName(a: any) {
      // this.name = a;
    },
  },
});
