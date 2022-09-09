import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env['NX_EMAIL_SERVICE'],
      auth: {
        user: process.env['NX_EMAIL_USER'],
        pass: process.env['NX_EMAIL_PASS'],
      },
    });
  }

  sendWelcomeEmail(toAddress: string) {
    this.transporter.sendMail(
      {
        from: process.env['NX_EMAIL_FROM'],
        to: toAddress,
        subject: 'Welcome to Journey',
        text: `Hi there,\n\nThank you for signing up for Journey!\n\nTo start planning, please visit:\n\n${process.env['NX_ORIGIN_JOURNEY_UI']}\n\nTo view your account, please visit:\n\n${process.env['NX_ORIGIN_ACCOUNTS_UI']}\n\nBest,\n\nThe Journey Team`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      }
    );
  }

  sendPasswordResetEmail(toAddress: string, resetLink: string) {
    this.transporter.sendMail(
      {
        from: process.env['NX_EMAIL_FROM'],
        to: toAddress,
        subject: 'Reset your Journey password',
        text: `Hi there,\n\nSomeone (hopefully you) has requested a password reset for your Journey account. Follow the link below to set a new password:\n\n${process.env['NX_ORIGIN_ACCOUNTS_UI']}/login/${resetLink}\n\nIf you no longer wish to reset your password, please disregard this email and no action will be taken.\n\nBest,\n\nThe Journey Team`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      }
    );
  }
}
