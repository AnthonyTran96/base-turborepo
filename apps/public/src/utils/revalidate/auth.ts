import { ENVConfig } from '@/config/env';
import { JwtAuthService } from '@repo/utils/auth';

const revalidateService = new JwtAuthService({
  secret: ENVConfig.REVALIDATE_SECRET ?? '',
  issuer: ENVConfig.REVALIDATE_ISS ?? '',
  audience: ENVConfig.REVALIDATE_AUD ?? ''
});

export const withAuth = revalidateService.withAuth.bind(revalidateService);

export const sign = revalidateService.sign.bind(revalidateService);

export const getBearerToken = revalidateService.getBearerToken.bind(revalidateService);

export const verifyTokenOrThrow = revalidateService.verifyTokenOrThrow.bind(revalidateService);
