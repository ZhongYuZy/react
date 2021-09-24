import React, { useEffect, useState } from 'react';
import {
  Card,
  message,
  Modal,
  Input,
  Form,
  Upload,
  DatePicker,
  Tabs,
  Switch,
  Button,
  Select,
  Tree,
  Checkbox,
  Divider,
  Cascader,
} from 'antd';
import {
  UploadOutlined,
  LockOutlined,
  MailOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import { spawn } from '@umijs/utils';
// import E from 'wangeditor';

interface props {
  modify: () => void; //关闭弹窗
  addok: (value: any) => void; //点击确定添加
  revocation: (val: any) => void;
}
const { Option } = Select;
const { DirectoryTree } = Tree;

const Add = (props: props) => {
  // 商品模型
  let list = useSelector((state: any) => state.addgoods.obj);
  //   获取商品规格
  let obj = useSelector((state: any) => state.addgoods.topics);
  //   商品分类
  let arr = useSelector((state: any) => state.addgoods.data);
  const { TabPane } = Tabs;

  const [flag, setflag] = React.useState(false);
  let [src, setsrc] = React.useState('');
  let [state, setState] = React.useState('');
  const [form] = Form.useForm(); //
  const { RangePicker } = DatePicker;
  let [show, setShow] = useState<boolean>(true);
  let [show1, setShow1] = useState<boolean>(true);
  let [show2, setShow2] = useState<boolean>(true);
  let [num, setNum] = useState<string>('1');
  let [src1, setsrc1] = React.useState('');
  let dispatch = useDispatch();

  //   确认添加
  let add = () => {
    //点击确认添加
    let value = form.getFieldsValue();
    props.addok(value);
    dispatch({
      type: 'addgoods/getTopics',
      payload: {
        // 商品名称*
        name: value.name,
        // 商品分类*
        category: value.category[1],
        // 商品图片
        pic: value.pic,
        // 商品视频
        video: '',
        // 是否热门
        isHot: value.isHot,
        // 是否推荐
        isRecommend: value.isRecommend,
        // 封面图*
        cover: value.cover.file.response.data,
        // 原价
        originalPrice: value.originalPrice,
        // 现价
        presentPrice: value.presentPrice,
        // 优惠
        discount: '',
        // 商品详情
        detail: value.detail,
        // 商品规格
        spec: checkedSpec,
        // 商品简介
        introduction: value.introduction,
        // 商品单位
        company: value.company,
        // 商品库存
        stock: value.stock,
        // 是否新品
        isNewGood: value.isNewGood,
        // 商品评价
        comment: '',
        // 是否显示
        isShow: true,
        // 推荐介绍
        sellDesc: value.sellDesc,
        // 产品介绍
        productionDesc: value.sellDesc,
      },
    });
    revocation();
  };
  //   封面图
  function callback(key: any) {
    // console.log(key);
    setNum(key);
  }
  //   封面图
  let onPreview = async (file: any) => {
    let src1 = file.url;
    if (!src1) {
      src1 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setflag(true);
    setsrc(src1);
  };
  //   商品图片
  const onPreview1 = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow && document.write(image.outerHTML);
  };
  //   商品图片
  let onChange = (file: any) => {
    // console.log(file);
    form.setFieldsValue({ pic: file.fileList });
  };

  //   取消
  let revocation = () => {
    props.revocation(false);
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    // console.log(val);
    dispatch({
      type: 'addgoods/specification',
      payload: { parentId: val.value },
    });
  };
  //   选中的规格
  let [checkedSpec, setCheckedSpec] = useState<string[]>([]);
  //   全选
  let changeAllCheck = (e: any, item: any) => {
    // console.log(e);
    if (e.target.checked) {
      item.checkList = [...item.spec_item];
      setCheckedSpec([...checkedSpec, ...item.checkList]);
    } else {
      let arr: string[] = [];
      item.checkList! = [];
      checkedSpec.map((s) => {
        let flag = true;
        item.spec_item.map((i: any) => {
          if (s === i) {
            flag = false;
          }
        });

        if (flag) {
          arr.push(s);
        }
      });
      setCheckedSpec([...arr]);
    }
  };
  //   单选
  let changeCheck = (e: any, i: string, item: any) => {
    let arr: string[] = [];
    if (e.target.checked) {
      item.checkList && item.checkList.push(i);
      arr.push(i);
      item.checkList;
      setCheckedSpec([...checkedSpec, ...arr]);
    } else {
      item.checkList = item.checkList!.filter((s: any) => {
        return s !== i;
      });
      let arr: string[] = [];
      arr = checkedSpec.filter((s: any) => {
        return s !== i;
      });
      setCheckedSpec(arr);
    }
  };
  let [discount, setDiscount] = useState<any>();
  //   生命周期
  useEffect(() => {
    dispatch({
      type: 'addgoods/updateBanner',
      payload: { current: 1, pageSize: 5, query: '' },
    });
    dispatch({
      type: 'addgoods/classify',
      payload: '',
    });
  }, []);
  useEffect(() => {
    if (!show2) {
      // const editor = new E('#text');
      editor.create();
      editor.config.onchange = (newHTML: any) => {
        discount = newHTML;
        setDiscount(discount);
        form.setFieldsValue({ detail: discount });
      };
    }
  }, [show2]);
  function onChange1(value: any) {
    console.log(value);
  }

  return (
    <div>
      <Card>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          onClick={revocation}
        >
          <CloseOutlined />
        </div>
        <Tabs activeKey={num} onChange={callback}>
          <TabPane tab="基础设置" key="1">
            <Form form={form}>
              <Form.Item
                label="商品名称"
                name="name1"
                rules={[{ required: true, message: '商品名称为必传项' }]}
              >
                <Input placeholder="请输入商品名称" />
              </Form.Item>

              <Form.Item
                name="category"
                label="商品分类"
                rules={[{ required: true, message: '商品分类为必传项' }]}
              >
                <Cascader
                  options={arr && arr.data}
                  onChange={onChange}
                  placeholder="请选择商品分类"
                />
              </Form.Item>

              <Form.Item
                label="商品原价"
                name="originalPrice"
                rules={[{ required: true, message: '商品原价为必传项' }]}
              >
                <Input placeholder="请输入商品原价" />
              </Form.Item>

              <Form.Item
                name="presentPrice"
                label="商品现价"
                rules={[{ required: true, message: '商品现价为必传项' }]}
              >
                <Input placeholder="请输入商品现价" />
              </Form.Item>

              <Form.Item
                className="mar-l15"
                label="封面图"
                name="cover"
                rules={[{ required: true, message: '图片为必传项' }]}
              >
                <Upload
                  name="logo"
                  headers={{ Authorization: localStorage.getItem('token')! }}
                  action="http://localhost:7001/admin/upload"
                  listType="picture"
                  onPreview={onPreview}
                >
                  <div>点击上传图片</div>
                </Upload>
              </Form.Item>

              <Form.Item
                name="company"
                label="商品单位"
                rules={[{ required: true, message: '商品单位为必传项' }]}
              >
                <Input placeholder="请输入商品单位" />
              </Form.Item>

              <Form.Item
                label="商品库存"
                name="stock"
                rules={[{ required: true, message: '商品库存为必传项' }]}
              >
                <Input placeholder="请输入商品库存" />
              </Form.Item>
              <Form.Item
                label="商品简介"
                name="introduction"
                rules={[{ required: true, message: '商品简介为必传项' }]}
              >
                <Input placeholder="请输入商品简介" />
              </Form.Item>

              <Form.Item
                name="sellDesc"
                label="推荐介绍"
                rules={[{ required: true, message: '推荐介绍为必传项' }]}
              >
                <Input
                  placeholder="请输入推荐介绍"
                  style={{ width: '100%', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                name="isNewGood"
                label="是否新品"
                valuePropName="checked"
                initialValue
              >
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item
                name="isHot"
                label="是否热销"
                valuePropName="checked"
                initialValue
              >
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item
                name="isRecommend"
                label="是否推荐"
                valuePropName="checked"
                initialValue
              >
                <Switch defaultChecked />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={() => {
                setShow(false);
                setNum('2');
              }}
            >
              确认
            </Button>
            <span style={{ margin: '0 10px' }}>
              <Button onClick={revocation}>取消</Button>
            </span>
          </TabPane>
          <TabPane tab="媒体信息" disabled={show} key="2">
            <Form form={form} preserve={false}>
                 
              <Form.Item
                name="pic"
                label="商品图片"
                rules={[{ required: true, message: '图片为必传项' }]}
              >
                                    
                <Upload
                  headers={{ Authorization: localStorage.getItem('token')! }}
                  action="http://localhost:7001/admin/upload"
                  listType="picture-card"
                  onPreview={onPreview1}
                  onChange={onChange}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div>+</div>
                    <div> 点击上传图片 </div>
                  </div>
                                     
                </Upload>
                                
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={() => {
                setShow1(false);
                setNum('3');
              }}
            >
              确认
            </Button>
          </TabPane>
          <TabPane tab="商品规格" disabled={show1} key="3">
            <Form form={form} preserve={false}>
              <Form.Item
                name="parentId"
                label="商品模型"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="请选择所属模型"
                  onChange={onGenderChange}
                  allowClear
                >
                  {list &&
                    list.data &&
                    list.data.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item._id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item name="spec" label="商品规格">
                {obj && obj.data && obj.data.length > 0 ? (
                  <div>
                    {obj.data.map((item: any, index: number) => {
                      return (
                        <div
                          key={item._id}
                          style={{
                            margin: '10px 0',
                            borderBottom: '1px solid #DDD',
                          }}
                        >
                          <span>
                            <Checkbox
                              checked={
                                item.checkList!.length === item.spec_item.length
                              }
                              onChange={(e) => {
                                changeAllCheck(e, item);
                              }}
                            ></Checkbox>
                          </span>
                          <span style={{ marginLeft: '10px' }}>
                            {item.name}
                          </span>
                          <div style={{ margin: '15px 0' }}>
                            {item.spec_item
                              ? item.spec_item.map((i: any) => {
                                  return (
                                    <span
                                      key={i}
                                      style={{ marginRight: '10px' }}
                                    >
                                      <span>
                                        <Checkbox
                                          checked={item.checkList!.includes(i)}
                                          onChange={(e) => {
                                            changeCheck(e, i, item);
                                          }}
                                        ></Checkbox>
                                      </span>
                                      <span style={{ marginLeft: '10px' }}>
                                        {i}
                                      </span>
                                    </span>
                                  );
                                })
                              : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>暂无规格</div>
                )}
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={() => {
                setShow2(false);
                setNum('4');
                dispatch({
                  type: 'addgoods/specification1',
                  payload: '',
                });
              }}
            >
              确认
            </Button>
          </TabPane>
          <TabPane tab="商品详情" disabled={show2} key="4">
            <Form form={form} preserve={false}>
              <Form.Item
                name="detail"
                label="商品详情"
                rules={[{ required: true }]}
              >
                <div style={{ margin: '10px 0' }} id="text"></div>
              </Form.Item>
            </Form>
            <Button type="primary" onClick={add}>
              确认
            </Button>
          </TabPane>
        </Tabs>

        <Modal
          title="预览图片"
          visible={flag}
          footer={null}
          onCancel={() => {
            setflag(false);
          }}
        >
          <img src={src} style={{ width: '100%' }} />
        </Modal>
      </Card>
    </div>
  );
};

export default Add;
