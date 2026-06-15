import { Module } from '@nestjs/common';
import { PublicSiteConfigController } from './public-site-config.controller';
import { AdminSiteConfigController } from './admin-site-config.controller';
import { SiteConfigService } from './site-config.service';

@Module({
  controllers: [PublicSiteConfigController, AdminSiteConfigController],
  providers: [SiteConfigService],
})
export class SiteConfigModule {}
