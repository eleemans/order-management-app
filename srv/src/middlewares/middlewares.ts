import { NextFunction, Request, Response, Express } from 'express';
import { getServices } from '@sap/xsenv';
// import { JWTStrategy } from '@sap/xssec';
import passport from 'passport';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { JWTStrategy } = require('@sap/xssec');

export function initializeSecurity(app: Express): void {
  const xsuaaService = getServices({ xsuaa: { tag: 'xsuaa' } });
  app.use(passport.initialize());
  passport.use(new JWTStrategy(xsuaaService.xsuaa) as passport.Strategy);
  app.use(passport.authenticate('JWT', { session: false }));
}

// export function validateRequest(validators: RequestValidators) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (validators.params) {
//         req.params = await validators.params.parseAsync(req.params);
//       }
//       if (validators.body) {
//         req.body = await validators.body.parseAsync(req.body);
//       }
//       if (validators.query) {
//         req.query = await validators.query.parseAsync(req.query);
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export function notFound(req: Request, res: Response, next: NextFunction) {
//   res.status(404);
//   const error = new Error(`Not Found - ${req.originalUrl}`);
//   next(error);
// }

// export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, _: NextFunction) {
//   if (err instanceof ZodError) {
//     const validationErrors = err.errors.map((error) => ({
//       path: error.path.join('.'),
//       message: error.message,
//     }));
//     res.status(422).json({
//       message: JSON.stringify(validationErrors),
//     });
//     return;
//   }

//   // AxiosErrors from the i-Core server have validation errors in the data property
//   if (err instanceof AxiosError) {
//     const { response } = err;
//     if (response) {
//       const { status, data } = response;
//       res.status(status).json(data);
//       return;
//     }
//   }

//   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     stack: process.env.NODE_ENV === 'production' ? 'No stack trace' : err.stack,
//   });
// }
