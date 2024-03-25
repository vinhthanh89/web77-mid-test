import users from "../models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


const { hashSync, genSaltSync, compareSync } = bcrypt;

export const signUp = async (req, res) => {
  try {
    const body = req.body;
    const {
      password,
      name,
      birthDay,
      education,
      nationality,
      placeOfBirth,
      workExprience,
      hobby,
      target,
    } = body;

    const findUser = await users.findOne({ name });

    if (findUser) {
      return res.status(400).json({
        message: "tên người dùng đã tồn tại",
      });
    }

    const hashPassword = hashSync(password, genSaltSync());

    const user = await users.create({
      password: hashPassword,
      name,
      birthDay,
      education,
      nationality,
      placeOfBirth,
      workExprience,
      hobby,
      target,
    });

    return res.status(200).json({
      message: "Tạo người dùng thành công",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Tạo người dùng thất bại",
    });
  }
};

export const login = async (req, res) => {
  try {
    const body = req.body;
    const { name, password } = body;

    const findUser = await users.findOne({ name });

    if (!findUser) {
      return res.status(404).json({
        message: "Tên người dùng không tồn tại",
      });
    }

    const checkPassword = compareSync(password, findUser.password);

    if (!checkPassword) {
      return res.status(404).json({
        message: "Sai mật khẩu , vui lòng đăng nhập lại",
      });
    }

    const accessToken = jwt.sign(
      {
        name,
      },
      process.env.SCRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "đăng nhập thành công",
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: "lỗi sever",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const name = req.params.name;

    const findUser = await users.findOne({ name });

    if (!findUser) {
      return res.status(404).json({
        message: "người dùng không tồn tại",
      });
    }

    return res.status(200).json({
      message: "lấy dữ liệu người dùng thành công",
      findUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "lỗi sever",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const name = req.query.name;
    const loginName = req.name;

    if(loginName !== name){
      return res.status(403).json({
        message : "Người dùng không có quyền truy cập chức năng này"
      })
    }

    const findUser = await users.findOne(name);

    if (!findUser) {
      return res.status(400).json({
        message: "không tìm thấy id người dùng",
      });
    }

    await users.deleteOne({ name });
    return res.status(200).json({
      message: "xóa người dùng thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: "lỗi sever",
    });
  }
};

export const editUser = async (req,res) => {
  try {
    const name = req.params.name
      const data = req.body;
      const loginName = req.name;

      if(loginName !== name){
        return res.status(403).json({
          message : "Người dùng không có quyền hạn truy cập"
        })
      }

      const updateUser = await users.findOneAndUpdate({name} , data , {new : true});

      return res.status(200).json({
        message : "Update thông tin người dùng thành công"
      })


  } catch (error) {
    return res.status(400).json({
      message : "lỗi sever"
    })
  }
}
