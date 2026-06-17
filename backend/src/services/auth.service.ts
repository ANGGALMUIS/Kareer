import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import prisma from "../config/prisma";
import { LoginInput, RegisterInput } from "../validations/auth.schema";

class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Email sudah digunakan");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("Email atau password salah");
    }

    if (!user.password) {
      throw new Error("Akun ini menggunakan Google Login");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Email atau password salah");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    if (!user.password) {
      throw new Error("Akun Google Login tidak dapat mengubah password");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new Error("Password lama salah");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        password: hashedPassword,
      },
    });

    return true;
  }

  async changeEmail(userId: string, email: string) {
    const existing = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      throw new Error("Email sudah digunakan");
    }

    return prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        email,
      },
    });
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Email tidak ditemukan");
    }

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        resetPasswordToken: token,

        resetPasswordExpiry: new Date(Date.now() + 60 * 60 * 1000),
      },
    });

    console.log("RESET TOKEN:", token);

    return {
      message: "Token reset berhasil dibuat",
    };
  }

  async resetPassword(token: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,

        resetPasswordExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new Error("Token tidak valid atau kadaluarsa");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,

        resetPasswordToken: null,

        resetPasswordExpiry: null,
      },
    });

    return {
      message: "Password berhasil direset",
    };
  }
}

export default new AuthService();
