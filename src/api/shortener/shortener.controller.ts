import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { JoiValidationPipe } from "../../joi/joi.pipe";
import { UrlType } from "./shortener.types";
import { urlSchema } from "./shortener.validate.schema";

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post()
  create(@Body(new JoiValidationPipe(urlSchema)) data: UrlType) {
    return this.shortenerService.create(data.url);
  }

  @Patch()
  findOne(@Body(new JoiValidationPipe(urlSchema)) data: UrlType) {
    return this.shortenerService.findOne(data.url);
  }
}
