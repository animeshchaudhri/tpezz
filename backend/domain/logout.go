package domain

import "context"

type LogoutUsecase interface {
    Logout(c context.Context, userId string) error
}